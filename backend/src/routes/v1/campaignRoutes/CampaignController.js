const appRoot = require('app-root-path') + '/src/';
const reqResponse = require( appRoot +'cors/responseHandler');
const db = require( appRoot + 'models')
const Op = db.Sequelize.Op;
const moment = require('moment')

module.exports = {
  getAll: async (req, res) => {
    const start_time = req.query.start_time;
    const end_time = req.query.end_time;
    let order = (req.query.order ? req.query.order : 'id');
    let campaign = {};
    let where = {}
    if(typeof start_time !== 'undefined' && typeof end_time !== 'undefined') {
      where = {
        start_time: {
          [Op.gte]: moment(start_time)
        },
        end_time: {
          [Op.lte]: moment(end_time)
        }
      }
    }
    campaign = await db.campaign.findAll({
      where,
      attributes: {
          include: [[db.sequelize.fn("COUNT", db.sequelize.col("user_votes.id")), "count"]]
      },
      include:[{
        model:db.user_vote,
        attributes:[]
      }],
      order: [[db.sequelize.literal(`${order}`), 'DESC']],
      group: ['campaign.id']
    });

    res.status(200).send(reqResponse.sucessResponse(200, true, campaign ));
  },
  getById: async (req, res) => {
    const campaign = await db.campaign.findByPk(req.params.id,{
      attributes:['id','name','start_time','end_time',[
        db.sequelize.literal(`(SELECT option_id FROM user_votes WHERE user_votes.user_id = ${req.user.id}
          AND user_votes.campaign_id = ${req.params.id} GROUP BY option_id)`),'voted_id'
        ]],
        include:[{
          model:db.vote_option,
          attributes:['id','option_name']
        }]
      });
      if(campaign === null) {
        res.status(404).send(reqResponse.errorResponse(404));
      } else {
        res.status(200).send(reqResponse.sucessResponse(200, true, campaign ));
      }
    },
    getResultById: async (req, res) => {
      const current = moment()
      const campaign = await db.campaign.findByPk(req.params.id,{
        where:{
          end_time: {
            [Op.lte]: current
          }
        },
        include:[{
          model:db.vote_option,
          attributes:['id','option_name'],
          include:[{
            model:db.user_vote,
            attributes: [[db.Sequelize.fn('COUNT', db.Sequelize.col('option_id')), 'count']],
            separate:true,
            group: ['option_id']
          }]
        }]
      });
      if(campaign === null) {
        res.status(404).send(reqResponse.errorResponse(404));
      } else {
        res.status(200).send(reqResponse.sucessResponse(200, true, campaign ));
      }
    }
  }

const appRoot = require('app-root-path') + '/src/';
const reqResponse = require(appRoot + 'cors/responseHandler');
const { validationResult } = require('express-validator');
const Validation = require(appRoot + 'validation/UserValidation')
const db = require(appRoot + 'models')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { encrypt } = require(appRoot + 'cors/crpyto');

module.exports = {
  verification: async (req, res) => {
    let hkid = req.body.hkid.replace(/[\(\)']+/g,'');
    if(Validation.isHKID(hkid)) {
      hkid = encrypt(hkid)

      const [user, created] = await db.user.findOrCreate({
        where: { hkid: hkid },
        defaults: {
          hkid: hkid
        }
      });

      const token = jwt.sign({user}, 'secret');
      res.status(200).send(reqResponse.sucessResponse(200, true, { token }, "User Created" ));
    }else{
      res.status(200).send(reqResponse.sucessResponse(200, false, {}, "Invalid HKID" ));
    }
  },
  vote: async (req, res) => {
    const user = req.user;
    const body = req.body;
    body.user_id = user.id
    const campaign = await db.campaign.findByPk(body.campaign_id)

    if(moment().isAfter(moment(campaign.end_time),'second')){
      res.status(200).send(reqResponse.sucessResponse(200, false, {}, "投票已完結"));
      return false;
    }
    const [userVote, created] = await db.user_vote.findOrCreate({
      where: {campaign_id:body.campaign_id,user_id:user.id},
      defaults:body
    });
    if (created) {
      res.status(200).send(reqResponse.sucessResponse(200, created, {}, "Vote successful"));
    } else {
      res.status(200).send(reqResponse.sucessResponse(200, created, {}, "每個身份證碼只可投票一次"));
    }
  },
  getVoteRecord: async (req, res) => {
    /*const campaign = await db.campaign.findAll({
      include:[{
        model:db.user_vote,
        where:{
          'user_id':req.user.id
        },
        include:[{
          model:db.vote_option,
          attributes:['option_name']
        }]
      }],
      group: ['user_votes.option_id']
    });*/
    const campaign = await db.user.findByPk(req.user.id, {
      attributes:[],
      include: [{
        model:db.campaign,
        include:[{
          model:db.vote_option,
          include:[{
            model:db.user_vote,
            attributes: [[db.Sequelize.fn('COUNT', db.Sequelize.col('option_id')), 'count']],
            separate:true,
            group: ['option_id']
          }]
        }]
      }],
    });
    res.status(200).send(reqResponse.sucessResponse(200, true, campaign));
  }
}

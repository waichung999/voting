module.exports = (sequelize, DataTypes) => {
  const VoteOption = sequelize.define('vote_option', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    option_name: DataTypes.STRING,
    campaign_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'campaigns',
        key: 'id',
      }
    }
  });
  VoteOption.associate = function(models) {

    VoteOption.belongsTo(models.campaign,{foreignKey:'id',sourceKey:'campaign_id'});
    VoteOption.hasMany(models.user_vote,{foreignKey:'option_id',sourceKey:'id'});
  };
  return VoteOption;
}

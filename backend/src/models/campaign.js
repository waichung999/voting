module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('campaign', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  });
  Campaign.associate = function(models) {
    Campaign.hasMany(models.user_vote,{foreignKey:'campaign_id',sourceKey:'id'});
    Campaign.hasMany(models.vote_option,{foreignKey:'campaign_id',sourceKey:'id'});
  };

  return Campaign;
}

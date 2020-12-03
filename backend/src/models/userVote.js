module.exports = (sequelize, DataTypes) => {
  const UserVote = sequelize.define('user_vote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    campaign_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'campaigns',
        key: 'id',
      }
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    option_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'vote_options',
        key: 'id',
      }
    }
  });
  UserVote.associate = function(models) {
    UserVote.belongsTo(models.campaign,{foreignKey:'campaign_id',sourceKey:'id'});
  };
  return UserVote;

}

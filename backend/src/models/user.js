module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    hkid: DataTypes.STRING
  });
  User.associate = function(models) {
    User.hasMany(models.user_vote, {foreignKey: 'user_id',sourceKey: 'id'});
    User.belongsToMany(models.campaign, {through: 'user_vote' ,foreignKey:'user_id', otherKey:'campaign_id'});
  };
  return User;
}

module.exports = (sequelize, Sequelize) => {
  const Urls = sequelize.define("urls", {
    originalUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    shortUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postFix:{
      type: Sequelize.STRING,
      allowNull: false
    },
    expiryDate: {
      type: Sequelize.DATE
    }
  });

  return Urls;
};

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`mysql://${process.env.MYSQL_USERNAME}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOSTNAME}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE_NAME}`);

module.exports = sequelize;
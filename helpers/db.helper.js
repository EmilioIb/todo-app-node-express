const { Sequelize, DataTypes, Op } = require("sequelize");

const postgresSequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      iddle: 10000,
    },
  }
);

module.exports = { postgresSequelize, Sequelize, DataTypes, Op };

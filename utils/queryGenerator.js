const { postgresSequelize, Sequelize } = require("../helpers/db.helper");

async function executeQuery(query, replacements, oneRecord) {
  try {
    const result = await postgresSequelize.query(query, {
      replacements,
      type: Sequelize.QueryTypes.SELECT,
    });

    if (oneRecord) return result[0];

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  executeQuery,
};

const { Sequelize } = require('sequelize');

// Ubah disini
// const sequelize = new Sequelize('postgres://user:password@host:port/db_name')
const sequelize = new Sequelize('postgres://postgres:postgre@localhost:5432/postgres')

module.exports = sequelize
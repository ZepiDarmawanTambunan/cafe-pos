const {Sequelize} = require('sequelize');

const db = new Sequelize('db-cofe-pos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db;
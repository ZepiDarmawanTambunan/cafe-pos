const { Sequelize, DataTypes } =  require("sequelize");
const db = require('../config/Database');
const Users = require("./UserModel");

const Products = db.define('products', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true
});

Users.hasMany(Products);
Products.belongsTo(Users, {foreignKey: 'userId'});

module.exports = Products;
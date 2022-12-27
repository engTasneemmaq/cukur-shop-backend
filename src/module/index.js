'use strict';
require('dotenv').config();
const users = require('./users');
const { Sequelize, DataTypes } = require('sequelize');
const productModel = require('./product-model');
const DataCollection= require('./Collection');



const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const productsTable = productModel(sequelize, DataTypes);
const userTable = users(sequelize, DataTypes);

console.log(userTable);

const productCollection = new DataCollection(productsTable);


//relations database
userTable.hasMany(productsTable); //one user has many product
productsTable.belongsTo(userTable); //one product has one user

module.exports = {
    db: sequelize,
    users: users(sequelize, DataTypes),
    productCollection:productCollection,
};

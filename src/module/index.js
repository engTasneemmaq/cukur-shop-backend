'use strict';
require('dotenv').config();
const users = require('./users');
const { Sequelize, DataTypes } = require('sequelize');
const productModel = require('./product-model');
const ordersModel = require('./orders-model');
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
const ordersTable =ordersModel(sequelize, DataTypes);
console.log(userTable);

const productCollection = new DataCollection(productsTable);
const ordersCollection = new DataCollection(ordersTable);

//relations database
userTable.hasMany(ordersTable); //one user has many orders
ordersTable.belongsTo(userTable); // order has one user

module.exports = {
    db: sequelize,
    users: users(sequelize, DataTypes),
    productCollection:productCollection,
    ordersCollection:ordersCollection,
};

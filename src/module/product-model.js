'use strict';
const productModel = (sequelize, DataTypes) => 
sequelize.define('products', {

    name: 
    { type: DataTypes.STRING },
    slug:
     { type: DataTypes.STRING },
    category: 
    { type: DataTypes.STRING },
    image: 
    { type: DataTypes.STRING },
     price: 
    { type: DataTypes.FLOAT },
    countInStock: 
    { type: DataTypes.INTEGER },
    rating: 
    { type: DataTypes.FLOAT },
    numReview: 
    { type: DataTypes.INTEGER },
    desecription: 
    { type: DataTypes.STRING},
  },
  { timestamps: false })

module.exports = productModel;
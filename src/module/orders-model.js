const ordersModel = (sequelize, DataTypes) => 
sequelize.define('orders', {
 
    orderProduct: {  type: DataTypes.ARRAY(DataTypes.JSONB)},
    shippingAddress: { type: DataTypes.STRING },
    paymentMethod : { type: DataTypes.STRING },
    productPrice: { type: DataTypes.DOUBLE },
    totalPrice: { type: DataTypes.DOUBLE },
  },{ timestamps: false });
  
    
  
    module.exports = ordersModel;
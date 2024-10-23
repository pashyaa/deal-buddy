const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Coupon = sequelize.define('Coupon', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    discountType: {
        type: DataTypes.ENUM('Percentage', 'Flat'), 
        allowNull: false
    },
    discountValue: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    
}, {
    timestamps: false
});

module.exports = Coupon;

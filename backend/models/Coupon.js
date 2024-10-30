const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('../models/Category');
const Store = require('../models/Store');

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
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        },
        allowNull: true
    },
    storeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Store,
            key: 'id'
        },
        allowNull: true
    }
}, {
    timestamps: false
});

Coupon.belongsTo(Category, { foreignKey: 'categoryId' });
Coupon.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = Coupon;
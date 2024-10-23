const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    timestamps: false,
    

    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
               
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password, saltRounds);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password && user.changed('password')) {
               
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password, saltRounds);
            }
        }
    }
});

module.exports = User;

import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username : {
        type: DataTypes.STRING(100),
    },
    email : {
        type: DataTypes.STRING(100),
    },
    password : {
        type: DataTypes.STRING(255),
    },
    auth_font : {
        type: DataTypes.STRING(50),
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
});
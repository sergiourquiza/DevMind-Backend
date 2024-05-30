import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Module = sequelize.define("Module", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name : {
        type: DataTypes.STRING(100),
    },
    description : {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: false,
});
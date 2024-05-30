import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Difficulty = sequelize.define("Difficulty", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name : {
        type: DataTypes.STRING(100),
    }
}, {
    timestamps: false,
});
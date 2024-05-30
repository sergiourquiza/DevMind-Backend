import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Theory = sequelize.define("Theory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    moduleId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Module',
            key: 'id'
        }
    },
    description : {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: false,
});
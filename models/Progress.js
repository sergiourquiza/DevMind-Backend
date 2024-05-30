import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Progress = sequelize.define("Progress", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    moduleId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Module',
            key: 'id'
        }
    },
    progress_percentage : {
        type: DataTypes.FLOAT,
    }
}, {
    timestamps: false,
});
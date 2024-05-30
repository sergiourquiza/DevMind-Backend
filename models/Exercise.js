import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Exercise = sequelize.define("Exercise", {
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
    difficultyId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Difficulty',
            key: 'id'
        }
    },
    description : {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: false,
});
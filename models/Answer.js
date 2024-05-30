import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Answer = sequelize.define("Answer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    exerciseId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Exercise',
            key: 'id'
        }
    },
    answer : {
        type: DataTypes.STRING(500),
    }
}, {
    timestamps: false,
});
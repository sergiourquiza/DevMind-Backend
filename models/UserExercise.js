import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const UserExercise = sequelize.define("UserExercise", {
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
    exerciseId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Exercise',
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE
    }
    
}, {
    timestamps: false,
});
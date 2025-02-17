"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
class User extends sequelize_1.Model {
}
User.init({
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    streak: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    lastOpened: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: index_1.default,
    modelName: "User",
});
exports.default = User;

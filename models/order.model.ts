import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(10)
    },
    note: {
        type: DataTypes.STRING(500)
    },
    status: {
        type: DataTypes.STRING(20)
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt:{
        type: DataTypes.DATE
    }
}, {
    tableName: "orders",
    timestamps: true
});
export default Order;
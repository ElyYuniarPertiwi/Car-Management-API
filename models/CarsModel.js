import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Cars = db.define('cars',{
    name:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    size:{
        type: DataTypes.STRING
    },
    photo:{
        type: DataTypes.TEXT
    },
    userId:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName:true
});


(async () => {
    await db.sync();
})();

export default Cars;
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const inventorySchema = new Schema({
    category:{
        type: String,
        unique: [true,"Ya existe esta categoria"],
        require: [true,"A que categoria pertenece"]
    },
    price:{
        type: String,
        require:[true,"Debes de agregar un precio mayor a $0"],
        min: [1,"El precio es muy bajo"]
    },
    stock:{
        type: Number,
        require : true
    },
    productName:{
        type:String,
        require:[true, "Coloca el nombre del producto"]
    },
    description:{
        type: String,
        require: [true, "Debes de colocar una descripcion del producto"]
    },
    image:{
        type: String,
        default: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.citydogshare.org%2Fusers%2F83&psig=AOvVaw0DON6K6edOEt12ysJLdTL3&ust=1626906271101000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJiGqqXY8vECFQAAAAAdAAAAABAD"
    }
},{timestamps:true});

module.exports = model("Inventory",inventorySchema)
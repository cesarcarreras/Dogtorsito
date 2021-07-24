const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const inventorySchema = new Schema({
    category:{
        type: String,
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
    },
    image:{
        type: String,
        default: "https://cdns.iconmonstr.com/wp-content/assets/preview/2019/240/iconmonstr-product-3.png"
    }
},{timestamps:true});

module.exports = model("Inventory",inventorySchema)
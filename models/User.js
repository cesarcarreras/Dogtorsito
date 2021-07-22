//importar mongoose y destructurarlo

const mongoose = require("mongoose");
const {Schema, model} = mongoose;


const userSchema = new Schema({
    name: {
        type:String,
        required: [true, "Necesitas añadir un nombre"],
        minlength: 1,
    },
    email: {
        type: String,
        unique: [true, "Este correo ya existe"],
        required: [true, "Necesitas añadir un correo"]
    },
    password: {
        type: String,
        required: [true, "Debes incluir una constraseña"]
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHVwcHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    },
    pet: {
        type: String,
        required: [true, "Debes poner el tipo de mascota"]
    },
    breed: {
        type: String,
        required: [true, "Debes incluir una raza"]
    },
    role:{
        type:String,
        default: "USER",
        enum:["ADMIN", "USER"]
    }

}, {timestamp:true});

                // Lleva dos valores model("Elnombre del modelo", estructura)
module.exports = model("User", userSchema)
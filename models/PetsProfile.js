const mongoose = require("mongoose");
const {Schema, model} = mongoose;


const petsSchema = new Schema({
    _vet:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Se requiere agregar veterinario"]
     },
     _patient:{type:Schema.Types.ObjectId,
       ref:"User",
       required:[true,"Se requiere agregar paciente"]
    },
    name: {
        type:String,
        required: [true, "Necesitas añadir un nombre"],
        minlength: 1,
    },
    age:String,
    breed:String,
    gender:String,
    weight:String,
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    },
    owneremail: {
        type: String,
        unique: [true, "Este correo ya existe"],
        required: [true, "Necesitas añadir un correo"]
    },
    description:{
        type:String,
        minlength:10,
        maxlength:140 //cantidad de caracteres
    },
   

}, {timestamp:true});

                // Lleva dos valores model("Elnombre del modelo", estructura)
module.exports = model("PetsProfile", petsSchema)
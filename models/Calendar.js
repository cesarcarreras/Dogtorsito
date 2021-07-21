const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const EventSchema = new Schema({
    _vet:{
       type:Schema.Types.ObjectId,
       ref:"User",
       required:[true,"Se requiere agregar veterinario"]
    },
    _patient:{type:Schema.Types.ObjectId,
      ref:"User",
      required:[true,"Se requiere agregar paciente"]
   },
   name:String,
   title: {
      type: String,
      required:[true,"Debes incluir un titulo"]
   },
   allDay:{
      type:Boolean
   },
    start: {
       type: Date,
       required:[true,"Se requiere especificar la fecha"]
    },
    end: {
       type: Date,
       default:null
    },
 })
module.exports = model("Calendar", EventSchema)
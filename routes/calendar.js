const express = require('express');
const router = express.Router();
//importar el model(s) que necesitamos
const Calendar = require("../models/Calendar");
const { checkRole,veryToken } = require("../util/auth-mid")

//Creamos la cita para el cliente
router.post('/create',veryToken,checkRole(['ADMIN']),(req,res) =>{
    const {_id:_vet} = req.user
    Calendar.create({...req.body,_vet})
    .then(appointment => {
        res.status(200).json({result:appointment})
    })
    .catch(error=>{
        res.status(400).json({msg:"No se puede crear la cita",error})
    })
})


//Revisamos el calendario de citas
router.get("/",veryToken,(req,res)=>{
    Calendar.find({$or:[{_vet:req.user._id},{_patient:req.user._id}]})
    .then(appointments =>{
        res.status(200).json({result:appointments})
    })
    .catch(error=>{
        res.status(400).json({msg:"No se encuentran las citas",error})
    })
})



//actualizar
router.patch("/updateCalendar/:calendar_id",veryToken,checkRole(['ADMIN']),(req, res)=>{
    //para darle mas cache o comodidad vamos a destructurarlo
    const { calendar_id } = req.params

    Calendar.findByIdAndUpdate(calendar_id, req.body,{new:true} )
    .then(updateCalendar => {
        res.status(200).json({result:updateCalendar})
    })
    .catch(error=>res.status(400).json({ error }))
})

router.delete("/deleteCalendar/:calendar_id",veryToken,checkRole(['ADMIN']),(req, res)=>{
    const { calendar_id } = req.params

    Calendar.findByIdAndDelete( calendar_id )
    .then(() => {
        res.status(200).json({msg:"Se elimino la cita exitosamente"})
    })
    .catch(error=>res.status(400).json({ error }))
})


module.exports = router;
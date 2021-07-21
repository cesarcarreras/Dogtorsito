const express = require('express');
const router = express.Router();
//importar el model(s) que necesitamos
const PetsProfile = require("../models/PetsProfile");
const { checkRole,veryToken } = require("../util/auth-mid")

//Creamos el perfil de la mascota
router.post('/create',veryToken,checkRole(['ADMIN']),(req,res) =>{
    const {_id:_vet} = req.user
    PetsProfile.create({...req.body,_vet})
    .then(profile => {
        res.status(200).json({result:profile})
    })
    .catch(error=>{
        res.status(400).json({msg:"No se puede crear el perfil",error})
    })
})


//Revisamos los perfiles
router.get("/",veryToken,(req,res)=>{
    PetsProfile.find({$or:[{_vet:req.user._id},{_patient:req.user._id}]})
    .then(profiles =>{
        res.status(200).json({result:profiles})
    })
    .catch(error=>{
        res.status(400).json({msg:"No se encuentran los perfiles",error})
    })
})



//actualizamos los perfiles
router.patch("/updateprofile/:profile_id",veryToken,checkRole(['ADMIN']),(req, res)=>{
    //para darle mas cache o comodidad vamos a destructurarlo
    const { profile_id } = req.params

    PetsProfile.findByIdAndUpdate(profile_id, req.body,{new:true} )
    .then(updateProfile => {
        res.status(200).json({result:updateProfile})
    })
    .catch(error=>res.status(400).json({ error }))
})

router.delete("/deleteprofile/:profile_id",veryToken,checkRole(['ADMIN']),(req, res)=>{
    const { profile_id } = req.params

    PetsProfile.findByIdAndDelete( profile_id )
    .then(() => {
        res.status(200).json({msg:"Se elimino el perfil"})
    })
    .catch(error=>res.status(400).json({ error }))
})


module.exports = router;
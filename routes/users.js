const express = require('express');
const router = express.Router();

//importar el model(s) que necesitamos
const User = require("../models/User");

//importar el util(s) que necesitamos
const { checkRole,veryToken } = require("../util/auth-mid")


//Conseguir listado de clientes
router.get("/clients",veryToken,checkRole(["ADMIN"]), (req, res, next)=> {
    User.find({$nor:[{ role:"ADMIN" }]})
    .then( users =>{
      res.status(200).json({result:users})
    })
    .catch( error => res.status(400).json({error}))
});

//Actualizar perfil
router.patch("/edit-my-user", veryToken,checkRole(["ADMIN","USER"]) ,(req,res)=>{
   //obtener el parametro id del req.params
    const { _id } = req.user
    const {role,...restUser} = req.body //Evita ponerte el role de ADMIN
    User.findByIdAndUpdate(_id, restUser, {new:true})
    .then( user =>{
      res.status(200).json({result:user})
    })
    .catch( error => res.status(400).json( {error} ) )
});

//Eliminar Perfil
router.delete("/:id/delete-user", veryToken , checkRole(["ADMIN"]), (res,req)=>{
  //obtener el parametro id del req.params
  const { id }= req.params
  User.findByIdAndDelete(id)
  .then( () =>{
    res.status(200).json({msg:"Usuario borrado"})
  })
  .catch( error => res.status(400).json( {error} ) )
});

module.exports = router;

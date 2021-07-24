const express = require ("express");
const router = express.Router();
const Inventory = require("../models/Inventory.js");

//Importamos utils
const {checkRole, veryToken} = require("../util/auth-mid")

//Llamar todo el inventario
router.get("/",veryToken,checkRole(["ADMIN"]),(req,res)=>{
    Inventory.find()
    .then(inventories => {
        res.status(200).json({result:inventories})
    })
    .catch(error => {
        res.status(400).json(error)
    })
});

//Crear nuevo producto
router.post("/create-item",veryToken,checkRole(["ADMIN"]),(req,res) =>{
    Inventory.create(req.body)
    .then(inventory => {
        res.status(200).json({msg :"Producto creado con exito",inventory})
    })
    .catch(error => {
        res.status(400).json({error})
    })
})

//Actaulizar item
router.patch("/update-item",veryToken,checkRole(["ADMIN"]),(req,res)=>{
    const {_id} = req.item
    Inventory.findByIdAndUpdate(_id,restItem, {new:true})
    .then(item =>{
        res.status(200).json({result:item})
    })
    .catch(error => res.status(400).json ({error}))
})

//Eliminar item
router.delete("/delete-item",veryToken,checkRole(["ADMIN"]),(req, res)=>{
    const { id } =req.params
    Inventory.findByIdAndDelete(id)
    .then( () => {
        res.status(200).json({msg:"Item eliminado"})
    })
    .catch(error => res.status(400).json({error}))
})

module.exports = router
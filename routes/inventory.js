const express = require ("express");
const router = express.Router();
const Inventory = require("../models/Inventory.js");

//Importamos utils
const {checkRole, veryToken} = require("../util/auth-mid")

//Llamar todo el inventario
router.get("/",(req,res)=>{
    Inventory.find()
    .then(inventories => {
        res.status(200).json({result:inventories})
    })
    .catch(error => {
        res.status(400).json(error)
    })
});

//Crear nuevo producto
router.post("/create-product", veryToken,(req,res) =>{
    Inventory.create(req.body)
    .then(inventory => {
        res.status(200).json({msg :"Producto creado con exito",inventory})
    })
    .catch(error => {
        res.status(400).json(error)
    })
})

module.exports = router
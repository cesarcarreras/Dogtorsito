/*
MIDDLEWARE
Esto nos va a servir para verificar y crear el Json web token
También para limpiar al usuario
*/

const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Creamos nuestro util
exports.createJWT = (user) => {
    //Crear un nuevo token
                        //jwt.sign(valoraEncrypt, palabra secreta, opciones)
    const token = jwt.sign({id: user._id}, process.env.SECRET,{
        expiresIn:"1d"
    })
    return token
};

//Verificar si tengo un usuario logeado
exports.veryToken = (req, res, next) => {
    //Destructurar del req.cookies el token
    const {token} = req.cookies

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if(error){
                return res.status(401).json({msg: "Tienes que tener una sesión", error})
            }
             //decoded = { id: "Un valor"}
                User.findById(decoded.id)
                .then(user => {
                    req.user = user
                    next()
                })
    });
};

//MIDDLEWARE para revisar roles
                    //["USER", "ADMIN"] || ["USER"] || ["ADMIN"]
exports.checkRole = (roles) => {

    return (req, res, next) => {
        //Sacar al usuario del req.user
        //{name:"Nombre", email:"correo@gmail.com", role: "USER"}
        const {role} = req.user
        if(roles.includes(role)){
          return next()
        } else {
            return res.status(403).json({msg: "No tienes permiso para realizar esta acción"})
        };
    };
};

//limpiar el objeto
                    //data = {}
exports.clearRes = (data) => {
            //Destructuramos el objeto data y retornamos un nuevo objeto únicamente con
            //los datos requeridos para nuestro dev
    const {password, __v, updateAt, ...cleanedData} = data
    return cleanedData
};
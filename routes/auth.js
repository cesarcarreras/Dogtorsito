require("dotenv").config();
const express = require ('express');
const router = express.Router();

//importamos modelo(s) a utilizar
const User = require("../models/User");
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const mailersend = new MailerSend({
  api_key: process.env.API_KEY
});

//importamos herramientas
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {clearRes,createJWT} = require("../util/auth-mid")


//RUTAS:
//SIGNUP
router.post('/signup', (req, res, next)  => {
    //destructuramos del body para obtener solo los datos relevantes
    const {email,name,password,confirmPassword,pet,breed} = req.body
    //Creamos los Destinatarios con los datos del body
    const recipients = [
        new Recipient(email, name)
      ];

     const variables = [
        {
          email: email,
          substitutions: [
            {
              var: "email",
              value: email
            }
        ]
        },
        {
          name: name,
          substitutions: [
            {
              var: "name",
              value: name
             }
         ]
        }
      ];

      const emailParams = new EmailParams()
      .setFrom("welcome@cesarcarreras.com")
      .setFromName("Dogtorsito")
      .setRecipients(recipients)
      .setSubject("Welcome to our big fluffly community! 🐶")
      .setVariables(variables)
      .setTemplateId('zr6ke4newe4on12w')

    //validar si el passsword es correcto
    if(password != confirmPassword){
        return  res.status(403).json({msg:"Las contraseñas no coinciden"})
    }

    //Encriptamos contraseña
    bcrypt.hash(password,10)
    .then(hashedPass =>{
        const user = {
            email,
            password:hashedPass,
            name,
            breed,
            pet,
        }

        User.create(user)
        .then(userCreated =>{
            //Sigue el proceso de sign up aunque haya problema con el correo
            try {
                mailersend.send(emailParams);
              } catch (e) {
                console.log(e)
              }

            //Convertir a util y usarlo en otras rutas
            const newUser = clearRes(userCreated.toObject())
            res.cookie("token", createJWT(userCreated) ,{
                expires:  new Date(Date.now + 86400000 ),
                secure:false, // true = HTTPS
                httpOnly:true
            } ).status(200).json({ result:newUser })
        })
    })
    .catch( error => res.status(400).json({error}))
});

//LOGIN
router.post("/login",(req,res)=>{
    const { email , password} = req.body;
    User.findOne({email})
    .then(user =>{
        if(user === null){
            return res.status(404).json({ msg:"El correo o contraseña son erroneos" })
        };

        bcrypt.compare(password, user.password)
        .then(match=>{

            if(match){
                const newUser = clearRes(user.toObject())

                res.cookie("token", createJWT(user) ,{
                    expires:  new Date(Date.now + 86400000 ),
                    secure:false, // True = HTTPS
                    httpOnly:true
                } ).status(200).json({ result:newUser })

            } else {
                return res.status(404).json({ msg:"El correo o contraseña son erroneos" })
            }
        })
    })
    .catch( error => res.status(400).json({error} ))
})

//LOGOUT
router.post("/logout",(req,res)=>{
    res.clearCookie("token").json({ msg: "vuelve pronto"})
})

module.exports = router;
var pattern = /^[a-zA-Z0-9!@#$%&*]{3,25}$/;
var express = require("express");
var {validate,validate1,validate2} = require("../validate");
var callBack = require("../authentication/validate");
var knex = require("../model.js");
var jwt = require("jsonwebtoken");
var router = express.Router();


router.post("/customers",async(req,res)=>{
    var result = req.body;
    var Schema = joi.object().keys({
        email: joi.string().email().required(),
        password : joi.string().min(7).regex(pattern).required(),
        name : joi.string().alphanum().lowercase().required()
    })
    var noobEmail = await knex("customer").select("email").where("email",req.body.email)
    if (noobEmail[0] == undefined){
        joi.validate(result,Schema,async(err,value)=>{
            if (err){
                console.log(err)
                res.status(422).json({
                    status: 'error',
                    message: 'Invalid request data',
                    data: result
                })
            }else{
                await knex("customer").insert(result)
                res.send("Inserted");
            }
        })
    }else{
        res.status(409).json({Err:"Oops! your email is already in use!!!"})
    }

})

router.get("/customer/:id",callBack,async(req,res)=>{
    var id = req.params.id
    var result = await knex("customer").select().where("customer_id",id)
    if (!result.length){
        res.status(401).json({
            "error": {
              "status": 401,
              "code": "AUT_02",
              "message": "Access Unauthorized",
              "field": "NoAuth"
            }
          })
    }
    else{res.send(result)}
    
})

router.post("/customers/login",async(req,res)=>{
    var need = req.body;
    var Schema = joi.object().keys({
        email: joi.string().email().required(),
        password : joi.string().min(7).regex(pattern).required()
    })
    joi.validate(need,Schema,async(err,value)=>{
        if (value){
            var needed = await knex("customer").select().where("email",value.email)
            if ((await needed).length !=0){
               if( needed[0].password == value.password){ 
                  var toKen = await jwt.sign(value['email'],"thaman")
                  res.send(toKen);
                }else{
                    res.status(404).send({err:"Your password is wrong"})
                }
            }else{
                res.status(404).send({err:"You are not our User go and signup First"})
            }
        }else{  
            res.send(err)
        }
    })

})

router.put("/customers/:id",callBack,async(req,res)=>{
    var value = await validate(req,res);
    if (value){
        var available =await knex("customer").select("*").where("email",`${value.email}`);
        if (available[0]['email']){
            await knex("customer").where('email',req.body.email).update(req.body)
            res.send({msg:"Updated"})
        }
    }
})

router.put("/customers/address/:id",callBack,async(req,res)=>{
    var value = await validate1(req,res);
    if (value){
        var available =await knex("customer").select("*").where("customer_id",req.params.id);
        if (available[0]['email']){
            await knex("customer").where('customer_id',req.params.id).update(req.body)
            res.send({msg:"Updated"})
        }
    }
})

router.put("/customers/creditCard/:id",callBack,async(req,res)=>{
    var value = await validate2(req,res);
    if (value){
        var available =await knex("customer").select("*").where("customer_id",req.params.id);
        if (available[0]['email']){
            await knex("customer").where('customer_id',req.params.id).update(req.body)
            res.send({msg:"Updated"})
        }
    }
})

module.exports = router;
var pattern = /^[a-zA-Z0-9!@#$%&*]{3,25}$/;
var express = require("express");
var callBack = require("../authentication/validate");
var knex = require("../model.js");
var router = express.Router();

router.post("/orders/:id",(req,res)=>{
    console.log("1111")
    var data = req.body;
    var Schema = joi.object().keys({
        shipping_id: joi.number().integer().required(),
        tax_id : joi.number().integer().required()
    })
    joi.validate(data,Schema,async(err,result)=>{
        var fin = await knex("shopping_cart").select("*").where("cart_id",req.params.id);
        console.log(fin)
        if (fin.length){
            result["status"] = "1";
            let ts = Date.now();
            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            result["created_on"] = year + "-" + month + "-" + date;
            if (err) throw err;
            await knex("orders").insert(result)
            res.status(201).send({msg:"Order Accepted!!"})
        }
    })
})

router.get("/orders/:id",async(req,res)=>{
    var result = await knex("orders").select().where("order_id",req.params.id)
    res.send(result)
})

router.get("/orders/inCustomer/customer",callBack,async(req,res)=>{
    var result = await knex("orders").select()
    res.send({"Orders":result})
})

router.get("/orders/shortDetail/:id",callBack,async(req,res)=>{
    var result = await knex("orders").select( "order_id","total_amount","created_on","shipped_on","status")
    .where("order_id",req.params.id)
    res.send(result)
})

module.exports = router;
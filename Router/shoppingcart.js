var pattern = /^[a-zA-Z0-9!@#$%&*]{3,25}$/;
var express = require("express");
var callBack = require("../authentication/validate");
var knex = require("../model.js");
var shortid = require('shortid');
var router = express.Router();


router.get("/shoppingcart/generateUniqueId",callBack,async(req,res)=>{
    res.send({"cart_id":shortid.generate()});
})

router.post("/shoppingcart/add/",callBack,async(req,res)=>{
    var data = req.body;
    console.log(data)       
    var Schema = joi.object().keys({
        // cart_id: joi.string().required(),
        product_id: joi.number().integer().required(),
        attributes : joi.string().required()
    })
    joi.validate(data,Schema,async(err,result)=>{
        if (result){
            var value =await knex("product").select().where("product_id",parseInt(req.body.product_id));
            let ts = Date.now();
            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            data['cart_id']=shortid.generate(),
            data['added_on']= year + "-" + month + "-" + date,
            data['quantity']=value.length   
            await knex("shopping_cart").insert(data)
            res.send({msg:"Inserted"})
        }else{
            res.send(err)
        }
    })

})

router.get("/shoppingcart/:id",callBack,async(req,res)=>{
    var result = await knex("shopping_cart").select("*").where("cart_id",req.params.id);
    res.json(result)
})

router.delete("/shoppingcart/empty/:id",async(req,res)=>{
    var id = req.params.id
    var result = await knex("shopping_cart").where("cart_id",id).del();
    res.status(202).send({msg:"Deleted ",id});
})

router.get("/shoppingcart/moveToCart/:id",callBack,async(req,res)=>{
    var result = await knex("shopping_cart").select("*").where("item_id",req.params.id);
    res.json(result)
})

router.get("/shoppingcart/totalAmount/:id",callBack,async(req,res)=>{
    var result = await knex("shopping_cart").select("product_id").where("cart_id",req.params.id);
    var all = []
    for (var i of result){
        all.push(i['product_id'])
    }
    console.log(all);
    var list = []
    for (var j of all){
        var cost = await knex("product").select("price").where("product_id",j)
        list.push(cost)
    }
    console.log(cost);
    var prize = 0
    for(var k of cost){
        prize+=parseInt(k['price'])
    }    
    console.log(prize)
    res.send({price:`${prize}`});    
})  

router.get("/shoppingcart/getSaved/:id",callBack,async(req,res)=>{
    var result = await knex("shopping_cart").select("*").where("cart_id",req.params.id);
    res.json(result)
})

router.delete("/shoppingcart/removeProduct/:id",async(req,res)=>{
    var id = req.params.id
    var result = await knex("shopping_cart").where("item_id",id).del();
    console.log(result);
    res.status(202).send({msg:"Deleted ",id});
})

module.exports = router;
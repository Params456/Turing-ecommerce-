var express = require("express");
var knex = require("../model.js");
var router = express.Router();

router.get("/attributes",async(req,res)=>{
    var result = await knex("attribute").select()
    res.send(result)
})

router.get("/attributes/:id",async(req,res)=>{
    var result = await knex("attribute").select().where("attribute_id",req.params.id)
    res.send(result)
})

router.get("/attribute/values/:id",async(req,res)=>{
    var result = await knex("attribute_value").select().where("attribute_id",req.params.id)
    res.send(result)
})

router.get("/attributes/inProduct/:id",async(req,res)=>{
    var result = await knex("product_attribute").select("attribute_value_id").where("product_id",req.params.id)
    var lis = [];
    var list1 = []
    var list2 = []
    var list3 = []
    for (var i of result){
        for (var j in i){
            lis.push(i[j])
        }
    }
    for (var k of lis){
        var value = await knex("attribute_value").select("attribute_id","value").where("attribute_value_id",k)
        list1.push(value[0])
    }
    for (var l of list1) {
        var final = await knex("attribute").select("name").where("attribute_id",l["attribute_id"])
        l["attribute_name"]=final[0]["name"]
        list2.push(l)
    } 
    for (var m in lis){
        list2[m]["attrinute_value_id"] = lis[m]
        list3.push(list2[m])
    } 
    res.send(list3)
})

module.exports = router;
var express = require("express");
var knex = require("../model.js");
var router = express.Router();

router.get("/categories",async(req,res)=>{
    var result = await knex("category").select("*");
    res.json({result:result})
})

router.get("/categories/:id",async(req,res)=>{
    var result = await knex("category").select("*").where("category_id",req.params.id);
    res.json({msg:result})
})

router.get("/categories/inProduct/:product_id",async(req,res)=>{
    var no = await knex("product_category").select("category_id").where("product_id",req.params.product_id)
    for (var i of no);
    no = Object.values(i)[0]
    var result = await knex("category").select('category_id','name','department_id').where("category_id",no);
    res.json({msg:result})
})

router.get("/catrgories/inDepartment/:department",async(req,res)=>{
    var result = await knex("category").select('*').where({"department_id":req.params.department})
    res.json({msg:result})
})

module.exports = router;
var knex = require("../model.js");
var express = require("express");
var router = express.Router();

router.get("/departments",async(req,res)=>{
    var result = await knex("department").select('*');
    res.json({msg:result})
})

router.get("/departments/:id",async(req,res)=>{
    var result = await knex("department").select("*").where("department_id",req.params.id);
    console.log("1")
    res.json({msg:result})
})

module.exports = router;
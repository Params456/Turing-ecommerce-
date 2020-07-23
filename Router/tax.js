var knex = require("../model.js");
var express = require("express");
var router = express.Router();

router.get("/tax",async(req,res)=>{
    var result = await knex("tax").select()
    res.send({"tax":result})
})


router.get("/tax/:id",async(req,res)=>{
    var result = await knex("tax").select().where("tax_id",req.params.id)
    res.send({"tax":result})
})

module.exports = router;
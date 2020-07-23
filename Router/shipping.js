var knex = require("../model.js");
var express = require("express");
var router = express.Router();

router.get("/shipping/region",async(req,res)=>{
    res.send([
        {
        shipping_region_id: 1,
        shipping_region: "Please Select",
        },
        {
        shipping_region_id: 2,
        shipping_region: "US / Canada",
        },
        {
        shipping_region_id: 3,
        shipping_region: "Europe",
        },
        {
        shipping_region_id: 4,
        shipping_region: "Rest of World",
        },
        ])
})


router.get("/shipping/regions/:id",async(req,res)=>{
    var id = req.params.id
    console.log(id)
    var result =await knex("shipping").select("*").where("shipping_region_id",id)
    res.send(result)
})

module.exports = router;
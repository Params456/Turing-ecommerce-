var pattern = /^[a-zA-Z0-9!@#$%&*]{3,25}$/;
var express = require("express");
var knex = require("../model.js");
var router = express.Router();

router.get("/products",async(req,res)=>{
    var result = await knex("product").select("*");
    res.json({count:result.length,result:result})
})

router.get("/products/search",async(req,res)=>{
    var query = req.query
    var arr = [];
    var result = await knex("product").select("*");
    console.log(result)
    if (query.all_words == "on"){
        var arr = await knex("product").select("*").whereIn('name',[query.query_string]);
    }else{
        for (var i of result){
            if (i['name'].includes(query.query_string)){
                arr.push(i)
            }
        }
    }
    var list = [];
    for (var j of arr){
        if (query.description_length){
            var split1 = j['description'].split(j['description'][query.description_length])
            var splice1 =  split1.splice(0,1)
            j['description'] = (String(splice1+"..."))
            list.push(j)
        }else{
            list.push(j)
        }
    }
    var list1 = [];
    var list2 = [];
    for (var m=0; m<list.length; m++){
        if (list2.length != query.limit){
            list2.push(list[m])
        }
        if (list2.length == query.limit){
            list1.push(list2)
            list2 = []; 
        }
    }
    res.send(list1)
})

router.get('/products/:product_id', async(req, res) => {
    var result = await knex("product").select("*").where({"product_id" : req.params.product_id})
    res.send(result)
})

router.get('/products/inCategory/:department_id', async(req, res) => { 
    var query = req.query;
    var no = await knex("category").select("category_id").where("department_id",req.params.department_id)
    var arr1 = [];
    var p_n = [];
    var arr = [];
    for (var i of no){
        var no1 = await knex("product_category").select('product_id').where('category_id',i['category_id'])
        arr1.push(no1)
    }
    for (var j of arr1){
        for (var k of j){
            p_n.push(k['product_id'])
        }
    }
    for (var l of p_n){
        var result1 = await knex('product').select('*').where('product_id',l);
        arr.push(result1[0]);
    }
    var list = [];
    for (var p of arr){
        if (query.description_length){
            var split1 = p['description'].split(p['description'][query.description_length])
            var splice1 =  split1.splice(0,1)
            p['description'] = (String(splice1+"..."))
            list.push(p)
        }else{
            list.push(p)
        }
    }
    var list1 = [];
    var list2 = [];
    for (var m=0; m<list.length; m++){
        if (list2.length != query.limit){
            list2.push(list[m])
        }
        if (list2.length == query.limit){
            list1.push(list2)
            list2 = []; 
        }
    }
    res.send(list1)
    
})

router.get('/products/:product_id/details', async(req, res) => {
    var result = await knex("product").select("*").where({"product_id" : req.params.product_id})
    res.send(result)
})

router.get("/products/:product_id/locations",async(req,res)=>{
    var no = await knex("product_category").select("category_id").where("product_id",req.params.product_id)
    for (var i of no);
    no = Object.values(i)[0]
    var result = await knex("category").select('category_id','name','department_id').where("category_id",no);
    var depart_name = await knex("department").select("name").where("department_id",result[0]["department_id"]);
    result[0]["department_name"] = depart_name[0]["name"];
    res.json({msg:result})
})


router.post("/products/:product_id/review",async(req,res)=>{
    var data = req.body;
    var Schema = joi.object().keys({
        review : joi.string().required(),
        product_id: joi.number().integer().required(),
        rating : joi.number().integer().required()
    })
    joi.validate(data,Schema,async(err,result)=>{
        await knex(review).insert(data)
        res.send("sucessfull")
    })
})

router.get("/products/:product_id/review",async(req,res)=>{
    var result = await knex("review").select().where("product_id",req.params.product_id);
    res.send(result)
})

module.exports = router;
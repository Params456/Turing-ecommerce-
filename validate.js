module.exports ={
    async validate(req,res){
        var value =  await req.body;
        console.log(value)
            if (Object.keys(value).length === 0){ 
                res.status(400);
                res.json({error : "Please provide req data"})
                return;
        }
        var a = ['email','password']
        var arr = [];
        var status;
        for (var i of a){
            if (!value[i]){
                status = 422; //required
                arr.push({error : `${i} required`})
            }
        }   
        if (status){
            res.status(404);
            res.json({err:arr});
            return false;
        }else{return value};
    },

    async validate1(req,res){
        var value =  await req.body;
        console.log(value)
            if (Object.keys(value).length === 0){ 
                res.status(400);
                res.json({error : "Please provide req data"})
                return;
        }
        var a = ["address_1","city","region","postal_code","shipping_region_id"]
        var arr = [];
        var status;
        for (var i of a){
            if (!value[i]){
                status = 422; //required
                arr.push({error : `${i} required`})
            }
        }   
        if (status){
            res.status(404);
            res.json({err:arr});
            return false;
        }else{return value};
    },

    async validate2(req,res){
        var value =  await req.body;
        console.log(value)
            if (Object.keys(value).length === 0){ 
                res.status(400);
                res.json({error : "Please provide req data"})
                return;
        }
        var a = ["credit_card"]
        var arr = [];
        var status;
        for (var i of a){
            if (!value[i]){
                status = 422; //required
                arr.push({error : `${i} required`})
            }
        }   
        if (status){
            res.status(404);
            res.json({err:arr});
            return false;
        }else{return value};
    }
}

const express = require("express");

const {ordersCollection} = require("../module/index");
const orderRouter = express.Router();
const bearer=require("../middlewares/bearer");
orderRouter.get("/order",getAll);
orderRouter.post("/order",creatOrder);
orderRouter.put("/order/:id",updating);
orderRouter.delete("/order/:id",deleting);
orderRouter.get("/order/:id",getOneOrder);

//create order
async function creatOrder(req,res){
let neworder =req.body;
let newOrder=await ordersCollection.create(neworder);
res.status(201).json(newOrder);


}
///////////select *//////////////////
async function getAll(req,res){
    let order = await ordersCollection.get();
    res.status(200).json(order);

}

///////////////update/////////
async function updating(req,res){

    let id = parseInt(req.params.id);
    let newOrder = req.body;
    let found = await ordersCollection.get(id);
    if (found) {
        let updated = await found.update(newOrder);
        res.status(201).json(updated);
    }
}
/////////////delete///////////////
async function deleting(req,res){

    let id = parseInt(req.params.id);
    let deleted = await ordersCollection.delete(id);
    res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneOrder(req,res)
{
    const id = parseInt(req.params.id);
    let recored = await ordersCollection.get(id);
    res.status(200).json(recored);
}
module.exports=orderRouter;
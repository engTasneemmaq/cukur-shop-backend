const express = require("express");

const {productCollection} = require("../module/index");
const productRouter = express.Router();
const bearer=require("../middlewares/bearer");
productRouter.get("/product",getAll);
productRouter.post("/product",creatProduct);
productRouter.put("/product/:id",updating);
productRouter.delete("/product/:id",deleting);
productRouter.get("/product/:id",getOneProduct);

//create product
async function creatProduct(req,res){
let newproduct =req.body;
let newProduct=await productCollection.create(newproduct);
res.status(201).json(newProduct);


}
///////////select *//////////////////
async function getAll(req,res){
    let product = await productCollection.get();
    res.status(200).json(product);

}

///////////////update/////////
async function updating(req,res){

    let id = parseInt(req.params.id);
    let newProduct = req.body;
    let found = await productCollection.get(id);
    if (found) {
        let updated = await found.update(newProduct);
        res.status(201).json(updated);
    }
}
/////////////delete///////////////
async function deleting(req,res){

    let id = parseInt(req.params.id);
    let deleted = await productCollection.delete(id);
    res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneProduct(req,res)
{
    const id = parseInt(req.params.id);
    let oneProduct = await productCollection.get(id);
    res.status(200).json(oneProduct);
}
module.exports=productRouter;
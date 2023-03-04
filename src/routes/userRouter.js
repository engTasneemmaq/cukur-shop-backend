const express = require("express");
const bearer = require("../middleware/bearer");
const bcrypt = require("bcrypt");

const { userCollection } = require("../models/index");
const userRouter = express.Router();



userRouter.get("/user", bearer,  getAll);
userRouter.post("/user", bearer,  creatRecord);
userRouter.put("/user/:id", bearer,  updating);
userRouter.delete("/user/:id", bearer,  deleting);
userRouter.get("/user/:id", bearer, getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  let newUser = req.body;

  let newRecored = await userCollection.create(newUser);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let users = await userCollection.read();
  res.status(200).json(users);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await userCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deletedUser=await userCollection.read(id)
  let deleted = await userCollection.delete(id);
  res.status(200).json({message:"Deleted",deleted:deletedUser});
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.id);
  let recored = await userCollection.read(id);
  res.status(200).json(recored);
}
module.exports = userRouter;
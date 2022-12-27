'use strict';
require("dotenv").config();

const { db } = require('./src/module/index');
const server= require('./src/server.js');
db.sync()
  .then(() => {

   server.startup(process.env.PORT || 3000);
  });
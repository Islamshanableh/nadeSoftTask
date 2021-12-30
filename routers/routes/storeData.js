const express = require("express");
const { StoreDataInDB } = require("../controllers/storeData");

const storeDataRouter = express.Router();

//get -       http://localhost:5000/storeData


storeDataRouter.get("/", StoreDataInDB);

module.exports = storeDataRouter;

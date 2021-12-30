const express = require("express");
const { saveInJson, downloadJson } = require("../controllers/fileRW");

const fileRWRouter = express.Router();

// 			routes
//get -       http://localhost:5000/file/save 
//get -       http://localhost:5000/file/download

fileRWRouter.get("/save", saveInJson);
fileRWRouter.get("/download", downloadJson);

module.exports = fileRWRouter;

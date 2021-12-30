const express = require("express");
const {
  getAllCountries,
  getCountryCurrencies,
  getAllCountriesByRegion,
} = require("../controllers/country");

const countryRouter = express.Router();


// 			routes
//get -       http://localhost:5000/country 
//get -       http://localhost:5000/country?search=JOR 
//get -       http://localhost:5000/country/currencies/400   
//get -       http://localhost:5000/country/region 


countryRouter.get("/", getAllCountries);
countryRouter.get("/currencies/:cca", getCountryCurrencies);
countryRouter.get("/region", getAllCountriesByRegion);

module.exports = countryRouter;

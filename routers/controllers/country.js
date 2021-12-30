const nadeSchema = require("../../db/models/nade");

// this function return all Countries and search by CCA2/CCA3/CCN3 and (common name or official)
const getAllCountries = (req, res) => {
  const serachResult = req.query.search;
  let conditon = [
    { ccn3: serachResult },
    { cca2: serachResult },
    { cca3: serachResult },
    { "name.common": serachResult },
    { "name.official": serachResult },
  ];
  if (!serachResult) {
    conditon = [{}];
  }
  nadeSchema
    .find({})
    .or(conditon)
    .then((result) => {
      if (!result.length) {
        res.status(404);
        return res.json({
          success: true,
          massage: `the country by => ${serachResult} not found `,
        });
      }
      res.status(200);
      res.json({
        success: true,
        massage: `the country by => ${serachResult} `,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        success: false,
        massage: `server error`,
      });
      console.log(err);
    });
};


// this function return Currencies for the country by CCA2
const getCountryCurrencies = (req, res) => {
  const cca2 = req.params.cca.toUpperCase();

  nadeSchema
    .findOne({ cca2: cca2 })
    .then((result) => {
      if (!result) {
        res.status(404);
        return res.json({
          success: true,
          massage: `the country currencie by => CCA2:${cca2} not found `,
        });
      }
      res.status(200);
      res.json({
        success: true,
        massage: `the ${result.name.common} currencies => CCA2: ${cca2} `,
        result: result.currencies,
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        success: false,
        massage: `server error`,
      });
      console.log(err);
    });
};


// this function return all Countries By Region
const getAllCountriesByRegion = async (req, res) => {
  nadeSchema
    .aggregate([
      { $group: { _id: "$region", Countries: { $push: "$name.common" } } },
    ])

    .then((countries) => {
      res.status(200).json({
        success: true,
        message: `All Countries By Region`,
        countries: countries,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

module.exports = {
  getAllCountries,
  getCountryCurrencies,
  getAllCountriesByRegion,
};

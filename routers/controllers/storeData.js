const https = require("https");
const nadeSchema = require("../../db/models/nade");

let url = "https://restcountries.com/v3.1/all";

// this function to get all countries from api url and then create for loop to save each country in database
const StoreDataInDB = (req, resp) => {
  let json = "";
  https
    .get(url, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", async () => {
        try {
          json = JSON.parse(body);
          json.forEach((element) => {
            const newNadeSchema = new nadeSchema({
              name: element.name,
              languages: element.languages,
              cca2: element.cca2,
              cca3: element.cca3,
              ccn3: element.ccn3,
              currencies: element.currencies,
              region: element.region,
              latlng: element.latlng,
            });

            newNadeSchema
              .save()
              .then((result) => {})
              .catch((err) => {
                resp.status(500);
                resp.json({ success: false, message: "server error" });
              });
          });
          resp.status(200);
          resp.json({ success: true, message: "save data in DB success" });
          return;
        } catch (error) {
          console.error(error.message);
        }
      });
    })
    .on("error", (error) => {
      console.error(error.message);
    });
};

module.exports = { StoreDataInDB };

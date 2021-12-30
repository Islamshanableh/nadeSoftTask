const https = require("https");
const fs = require("fs");

let url = "https://restcountries.com/v3.1/all";

// this function to get all countries from api url and then Save the data in Json File called countries.json
const saveInJson = (req, resp) => {
  let result = "";
  https
    .get(url, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", async () => {
        try {
          result = Object.assign({}, JSON.parse(body));
          fs.writeFileSync(
            "countries.json",
            JSON.stringify(result, null, 2),
            (err) => {
              if (err) throw err;
              console.log("The file has been saved!");
            }
          );
          resp.status(200);
          resp.json({
            success: true,
            massage: `succses write file `,
          });
        } catch (error) {
          console.error(error.message);
        }
      });
    })
    .on("error", (error) => {
      console.error(error.message);
    });
};

// this function to download the file that called countries.json if the user authorized
const downloadJson = (req, res) => {
  const admin = req.headers.admin;
  if (admin == 1) {
    res.download("countries.json", (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  } else {
    res.status(401);
    res.json({
      success: false,
      massage: `you are not authorized to download the file`,
    });
    return;
  }
};

module.exports = { saveInJson, downloadJson };

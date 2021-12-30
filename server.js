const express = require("express");
const app = express();
const cors = require("cors")
const connection = require("./db/db");

app.use(express.json());

app.use(cors());


const storeDataRouter = require ("./routers/routes/storeData")
const countryRouter = require ("./routers/routes/country")
const fileRWRouter = require ("./routers/routes/fileRW")

app.use("/storeData",storeDataRouter)
app.use("/country",countryRouter)
app.use("/file",fileRWRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});

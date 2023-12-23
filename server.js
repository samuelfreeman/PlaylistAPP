const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const apiRoute = require("./routes/index");

const PORT = 8080;

const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("api", apiRoute);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

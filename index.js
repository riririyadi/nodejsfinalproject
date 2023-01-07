require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const sequelize = require("./database/connection");
const { syncDB } = require("./models/index");

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();
syncDB();

let port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});

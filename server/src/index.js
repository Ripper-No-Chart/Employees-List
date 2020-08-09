import express from "express";
import cors from "cors";
import morgan from "morgan";

const mongoose = require("./database");

const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/", require("./routes/employees.routes"));

//Server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

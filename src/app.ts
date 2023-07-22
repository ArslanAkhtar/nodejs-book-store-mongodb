import express from "express";
import http from "http";
import router from "./router/router";
import cookieParser from "cookie-parser";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
const port = 3000;

const server = http.createServer(app);

mongoose.Promise = global.Promise;
const mongoDB = process.env.DB_URI || "";
mongoose.connect(mongoDB);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

app.use("/", router);

server.listen(port, () => {
  console.log("The application is listening on port 3000!");
});

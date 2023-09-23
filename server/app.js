import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
export default app;

dotenv.config({
  path: "./config/config.env",
});

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://vishucakeshop.netlify.app"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use(
  cors({ credentials: true, origin: "https://vishucakeshop.netlify.app" })
);

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.set("trust proxy");

// Importing Routes
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/ordersRoute.js";
import getMyOrdersRoute from "./routes/ordersRoute.js";
import getOrderDetailsRoute from "./routes/ordersRoute.js";

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", getMyOrdersRoute);
app.use("/api/v1", getOrderDetailsRoute);

// Using Error Middleware
app.use(errorMiddleware);

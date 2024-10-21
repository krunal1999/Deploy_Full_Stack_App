import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello server");
});

app.use(router);

app.use(errorHandler);

export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    origin: "https://deploy-full-stack-app.vercel.app",
    methods: ["POST" , "GET"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "80kb",
  })
);

app.use(
  express.json({
    limit: "80kb",
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

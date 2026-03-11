import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./modules/auth/index.js";
import apiRouter from "./modules/apiKeys/index.js";
import { modelsRouter } from "./modules/models/index.js";
import { paymentsRouter } from "./modules/payments/index.js";
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/models", modelsRouter);
app.use("/pay", paymentsRouter);
app.listen(3000, () => {
    console.log("app running on port http://localhost:3000");
});

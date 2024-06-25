import express from "express";
import { config } from "dotenv";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js"
import otherRouter from './routes/otherRoutes.js'
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config({
  path: "./config/config.env",
});
const app = express();
app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true,
  methods:["GET","POST","PUT","DELETE"]
}))
app.use(express.json())
app.use(express.urlencoded({
  extended : true
}))
app.use(cookieParser())
app.use("/api/v1", courseRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", otherRouter);
export default app;
app.get("/",(req,res)=>res.send(`Server is working. Click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend`))
app.use(errorMiddleware);
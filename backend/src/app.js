import express from "express";
import cors from "cors";
import userControllers from "./routes/user.routes.js";
import newsControllers from "./routes/news.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users" , userControllers);
app.use("/api/news", newsControllers);

export default app;

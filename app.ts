import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import "reflect-metadata";
import { Task } from "./entity/Task";
import { AppDataSource } from "./db/config";
import taskRoute from "./routes";
import { notFoundRoute } from "./middlewares/notFoundRoute";
import { errorHandler } from "./middlewares/errorHandler";
import { initializeDb } from "./db/connectDb";



dotenv.config();

const app: Express = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initializeDb();

app.use('/api/v1/tasks', taskRoute);


app.use(notFoundRoute);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});


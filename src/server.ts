import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes/index";
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

export default function createServer() {
    const app: Application = express();

    // Middleware
    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }
    app.use(express.json());
    app.use(cors());

    // Routes
    app.get("/", (req: Request, res: Response) => {
        res.json("Main Route!");
    });

    app.use(routes);

    return app;
}

import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes/index";
import config from "./config";
import cors from "cors";
import connectDB from "./db";

const morgan = require("morgan");

export default function createServer() {
    const app: Application = express();

    // Connect to MongoDB
    connectDB();

    // Middleware
    if (config.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }
    app.use(express.json());

    var corsOptions: { origin: string; optionsSuccessStatus: number } = {
        origin: "http://localhost: 3000",
        optionsSuccessStatus: 200,
    };

    app.use(cors(corsOptions));

    // Routes
    app.get("/", (req: Request, res: Response) => {
        res.json("Main Route!");
    });

    app.use(routes);

    return app;
}

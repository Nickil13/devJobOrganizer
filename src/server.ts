import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes/index";
import config from "./config";
import cors from "cors";

const morgan = require("morgan");

export default function createServer() {
    const app: Application = express();

    // Middleware
    if (config.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }
    app.use(express.json({ limit: "50mb" }));

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

    // Error Handling
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.log("inside error handler");
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode);
        res.json({
            message: error.message,
            stack: config.NODE_ENV === "production" ? null : error.stack,
        });
    });

    return app;
}

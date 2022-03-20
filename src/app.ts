import createServer from "./server";
import config from "./config";

const startServer = () => {
    const app = createServer();
    const port: number = config.PORT || 5000;

    app.listen(port, () => {
        console.log(`Running on port ${port}`);
    });
};

startServer();

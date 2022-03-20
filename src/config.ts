import dotenv from "dotenv";

// Parsing the env file.
dotenv.config();

interface ENV {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    MONGO_URI: string | undefined;
    MONGO_URI_TEST: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    MONGO_URI: string;
    MONGO_URI_TEST: string;
}

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        MONGO_URI: process.env.MONGO_URI,
        MONGO_URI_TEST: process.env.MONGO_URI_TEST,
    };
};

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;

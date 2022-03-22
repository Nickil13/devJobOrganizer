import mongoose from "mongoose";
import config from "./config";

const uri: string =
    config.NODE_ENV === "test" ? config.MONGO_URI_TEST : config.MONGO_URI;

export const connectDB = async () => {
    await mongoose
        .connect(uri)
        .then((res) => {
            if (config.NODE_ENV === "test") {
                console.log(
                    `MongoDB TEST Database Connected! ${res.connection.host}`
                );
            } else {
                console.log(`MongoDB Connected! ${res.connection.host}`);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

import { Schema, model } from "mongoose";

interface Application {
    name: string;
    position: string;
    date: Date;
    location: string;
    stack: [string];
    stage: string;
    listingURL: string;
}

const schema = new Schema<Application>({
    name: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: Date, default: Date.now },
    location: { type: String, required: true },
    stack: Array,
    stage: {
        type: String,
        enum: [
            "Building Cover Letter",
            "Application Sent",
            "No Offer",
            "On-Site Interview",
            "Online Interview",
            "Offer",
        ],
    },
    listingURL: { type: String, required: true },
});

export const Application = model<Application>("Application", schema);

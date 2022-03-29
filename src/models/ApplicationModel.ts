import { Schema, model } from "mongoose";

interface Application {
    name: string;
    position: string;
    date: Date;
    location: {
        city: string;
        province: string;
        address: string;
        postalCode: string;
        remote: boolean;
    };
    stack: string[];
    stage: string;
    listingURL: string;
    websiteURL: string;
    notes: string[];
}

const schema = new Schema<Application>({
    name: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: Date, default: Date.now },
    location: {
        city: { type: String, required: true },
        province: { type: String, required: true },
        address: String,
        postalCode: String,
        remote: { type: Boolean, required: true },
    },
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
    websiteURL: { type: String, required: true },
    notes: Array,
});

export const Application = model<Application>("Application", schema);

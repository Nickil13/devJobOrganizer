import { Schema, Types, model } from "mongoose";

interface User {
    name: string;
    email: string;
    password: string;
    applications: Types.ObjectId[];
}

interface Application {
    name: string;
    position: string;
    date: string;
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

const applicationSchema = new Schema<Application>({
    name: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: String, default: new Date().toDateString() },
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

const schema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    applications: [applicationSchema],
});

export const User = model<User>("User", schema);

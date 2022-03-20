import { Schema, Types, model } from "mongoose";

interface User {
    name: string;
    email: string;
    applications: [Types.ObjectId];
}

const schema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    applications: [
        {
            type: Schema.Types.ObjectId,
            ref: "Application",
        },
    ],
});

export const User = model<User>("User", schema);

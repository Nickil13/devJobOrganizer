import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/UserModel";

const jwtSecret: string = process.env.JWT_SECRET || "";

export const auth = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token: string;
        let authHeader: string = req.headers.authorization || "";

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, jwtSecret);
            const { id } = <JwtPayload>decoded;
            req.user = await User.findById(id).select("-password");

            next();
        } else {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }

        if (!token) {
            res.status(401);
            throw new Error("No token, authorization denied");
        }
    }
);

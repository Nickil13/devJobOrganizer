import { Request, Response } from "express";
import { User } from "../models/UserModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET || "";

// @route POST /auth
// @desc Authenticate a user
// @access Public
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid)
            return res.status(400).json({ message: "Password incorrect" });

        const token = await jwt.sign({ id: user._id }, jwtSecret, {
            expiresIn: 3600,
        });
        console.log(token, user);
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } else {
        res.status(404);
        throw new Error("User does not exist");
    }
};

// @route POST /auth/user
// @desc Create a new user
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        res.status(400);
        throw new Error("That email is already in use.");
    }

    const nameExists = await User.findOne({ name });
    if (nameExists) {
        res.status(400);
        throw new Error("username already active.");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hash,
    });

    // Generate jwt token
    const token = await jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: 3600,
    });

    if (user) {
        // Generate token
        res.status(201);

        res.json({ token, user });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export { login, registerUser };

import { Request, Response } from "express";
import { User } from "../models/UserModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET || "";

// @route GET /auth
// @desc Get the logged in user
// @access Private
const loadUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(404).json("User does not exist");
    }
};

// @route PUT /auth
// @desc Update the logged in user
// @access Private
const updateUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.user.id).select("-password");

    if (user) {
        user.name = req.body.user || user.name;
        user.email = req.body.email || user.email;

        user.applications = req.body.applications || user.applications;

        const savedUser = await user.save();
        res.json(savedUser);
    } else {
        res.status(404).json("User does not exist");
    }
};

// @route POST /auth
// @desc Authenticate a user
// @access Public
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        await bcrypt.compare(password, user.password).then((isValid) => {
            if (!isValid) {
                return res.status(400).json({ message: "Password incorrect" });
            }
        });

        jwt.sign(
            { id: user._id },
            jwtSecret,
            {
                expiresIn: `${process.env.JWT_EXPIRES}`,
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        applications: user.applications,
                    },
                });
            }
        );
    } else {
        return res.status(400).json({ message: "User does not exist" });
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
        expiresIn: `${process.env.JWT_EXPIRES}`,
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

export { login, registerUser, loadUser, updateUser };

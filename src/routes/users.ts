import { Router, Request, Response } from "express";
import { User } from "../models/UserModel";
import asyncHandler from "express-async-handler";

const router = Router();

// @route GET /user
// @desc Get a user by Id
// @access Public
router.get(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const user = await User.findById(req.params.id);

        if (user) {
            res.json(user);
        } else {
            res.status(404);
            throw new Error("User does not exist");
        }
    })
);

// @route POST /user
// @desc Create a new user
// @access Public
router.post("/", async (req: Request, res: Response) => {
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

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        // Generate token
        res.status(201);
        res.json(user);
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export default router;

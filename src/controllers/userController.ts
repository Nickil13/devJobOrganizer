import { Request, Response } from "express";
import { User } from "../models/UserModel";
import asyncHandler from "express-async-handler";

// @route GET /user/:id
// @desc Get a user by Id
// @access Public
const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User does not exist");
    }
});

// @route PUT /user/:id
// @desc Edit a user by id
// @access Private
const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
        const nameExists = await User.find({ name: req.body.name });
        const emailExists = await User.find({ email: req.body.email });

        if (nameExists.length > 0 && nameExists[0].name !== user.name) {
            res.status(400);
            throw new Error("Username already exists");
        }

        if (emailExists.length > 0 && emailExists[0].email !== user.email) {
            res.status(400);
            throw new Error("Email already exists");
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            applications: updatedUser.applications,
        });
    } else {
        res.status(404);
        throw new Error("User does not exist");
    }
});

// @route Delete /user/Lid
// @desc Delete a user by id
// @access Private
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.status(200).json({ message: "User successfully removed" });
    } else {
        res.status(404);
        throw new Error("User does not exist");
    }
});

export { getUserById, updateUser, deleteUser };

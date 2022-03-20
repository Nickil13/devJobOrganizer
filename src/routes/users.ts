import { Router, Request, Response } from "express";
import { User } from "../models/UserModel";
const router = Router();

// @route GET /user
// @desc Get a user by Id
// @access Public
router.get("/:id", async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User does not exist");
    }
});

export default router;

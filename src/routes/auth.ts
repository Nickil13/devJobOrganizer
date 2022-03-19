import { Router, Request, Response } from "express";

const router = Router();

// @route GET /auth
// @desc Authenticate a user
// @access Public
router.get("/", (req: Request, response: Response) => {
    response.sendStatus(200);
});

export default router;

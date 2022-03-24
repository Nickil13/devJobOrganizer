import { Router } from "express";
import { login, registerUser } from "../controllers/authController";

const router = Router();

router.post("/", login);

router.post("/user", registerUser);

export default router;

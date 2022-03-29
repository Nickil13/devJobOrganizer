import { Router } from "express";
import { login, registerUser } from "../controllers/authController";

const router = Router();

router.post("/user", registerUser);
router.post("/", login);

export default router;

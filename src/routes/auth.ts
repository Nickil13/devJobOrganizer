import { Router } from "express";
import {
    login,
    loadUser,
    registerUser,
    updateUser,
} from "../controllers/authController";
import { auth } from "../middleware/authMiddleware";
const router = Router();

router.route("/user").get(auth, loadUser).post(registerUser);
router.route("/").post(login).put(auth, updateUser);

export default router;

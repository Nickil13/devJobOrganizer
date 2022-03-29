import { Router } from "express";
import auth from "./auth";
import users from "./users";

const router = Router();

router.use("/api/auth", auth);
router.use("/api/users", users);

export default router;

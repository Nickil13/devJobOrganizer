import {
    deleteUser,
    getUserById,
    updateUser,
} from "../controllers/userController";
import { Router } from "express";
import { auth } from "../middleware/authMiddleware";

const router = Router();
router
    .route("/:id")
    .get(getUserById)
    .put(auth, updateUser)
    .delete(auth, deleteUser);

export default router;

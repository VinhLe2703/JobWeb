import express from "express";
import { registerUserController, loginUserController, logoutUserController, getUserController } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/logout", isAuthenticated, logoutUserController);
router.get("/getuser", isAuthenticated, getUserController);

export default router;

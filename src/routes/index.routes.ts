import express from "express";
import mainRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
const router = express.Router();

router.use("/users", mainRoutes);

router.use("/auth", authRoutes);

router.use("/news", postRoutes);

export default router;

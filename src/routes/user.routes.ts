import express from "express";
import { getUsers, getPostByUserId, topUsers } from "../controllers/user.controller";


const router = express.Router();

router.get("/", getUsers);

router.get("/:id/news", getPostByUserId);

router.get("/top-users", topUsers);



export default router;

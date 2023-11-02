import express from "express";
import schema from "../utils/validation-schema";
import { createPost, createComment } from "../controllers/post.controller";
import validate from "../middleware/validate";
import Auth from "../middleware/auth";

const router = express.Router();
const { CREATEPOST, CREATECOMMENT } = schema;


router.post("/", validate(CREATEPOST), Auth, createPost);
router.post("/:newsId/comments", validate(CREATECOMMENT), Auth, createComment);

export default router;

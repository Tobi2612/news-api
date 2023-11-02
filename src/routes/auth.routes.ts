import express from "express";
import schema from "../utils/validation-schema";
import validate from "../middleware/validate";
import {register,login} from "../controllers/auth.controller";


const router = express.Router();
const { REGISTER, LOGIN } = schema;

router.post("/register", validate(REGISTER), register);
router.post("/login", validate(LOGIN), login);


export default router;

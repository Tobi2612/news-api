import { tokenVerifier } from "../utils/jwt";
import ErrorResponse from "../utils/errors/index";
import { Request, Response, NextFunction } from 'express';
import { AuthResponse } from "../types";

const Auth = async (req:Request, _res:Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new ErrorResponse("No token provided", 404);
    }

    const token = authHeader.split(" ")[1];

    let decodedToken: AuthResponse = await tokenVerifier(token);

    if (!decodedToken.id) {
        throw new ErrorResponse("Access Denied! Token Expired", 412);
    }

    req["user"] = decodedToken;
    next();
    
};


export default Auth;

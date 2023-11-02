import jwt from "jsonwebtoken";
import Encryption  from "../config/encryption";
import { AuthResponse } from "../types";
import "dotenv/config";


export async function generateJwtToken(data: AuthResponse) {
    const unencrypt = {
        id: data.id,
        email: data.email,
        name: data.name
    };

    const encrypted = Encryption.encrypt(unencrypt);

    return jwt.sign(
        {
            encrypted
        },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
}

export const tokenVerifier = (authToken: string ): AuthResponse => {
    let { encrypted } = jwt.verify(authToken, process.env.JWT_SECRET as string) as any;

    return Encryption.decrypt(encrypted);
};
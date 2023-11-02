export type AuthResponse = { id: number; name: string; email: string};

declare global {
    namespace Express {
        export interface Request {
            user: AuthResponse;
        }
    }
}
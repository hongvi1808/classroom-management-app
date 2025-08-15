import { expressjwt } from "express-jwt";

export const authMiddleware = expressjwt({
    secret: process.env.JWT_SECRET || 'zbc123',
    algorithms: ['HS256'],
    credentialsRequired: false,
})
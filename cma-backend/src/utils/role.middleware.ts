import { errorResponse } from "./response";

export const authRoleMiddleware = (role: string) => {
    return (req: any, res: any, next: any) => {
        const user = req.user;

        if (!user || !user.role) {
            return errorResponse(res, { code: 'UNAUTHORIZE', message: 'Access denied. No role found.' }, 403);
        }

        if (user.role !== role) {
            errorResponse(res, { code: 'DENIED_AUTHORIZE', message: `Access denied. Requires ${role} role.` }, 403);
            return res.status(403).json({code: 'DENIED_AUTHORIZE', message: `Access denied. Requires ${role} role.` });
        }

        next();
    };
};
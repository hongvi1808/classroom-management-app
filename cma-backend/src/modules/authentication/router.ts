import { Router } from "express";
import 'reflect-metadata';
import Container from "typedi";
import { AuthenticationService } from "./service";
import { errorResponse, successResponse } from "../../utils/response";
import { generateToken } from "../../utils/jwt";

const router = Router();
const service = Container.get(AuthenticationService);
router.post('/create-access-code', async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const result = await service.createAccessCode(phoneNumber);
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});

router.post('/validate-access-code', async (req, res) => {
    const { phoneNumber, accessCode } = req.body;
    try {
        const result = await service.validateAccessCode(phoneNumber, accessCode);
        const refreshToken = await generateToken({ phoneNumber: result.phoneNumber, role: result.role }, process.env.REFRESH_TOKEN_SECRET, '30d')
        res.cookie("refreshToken", refreshToken.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 3600 * 1000
        });
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});

router.post('/login-with-email', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await service.loginWithEmail(email);
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});

router.post('/validate-email-access-code', async (req, res) => {
    const { email, accessCode } = req.body;
    try {
        const result = await service.validateEmail(email, accessCode);
        const refreshToken = await generateToken({ phoneNumber: result.phoneNumber, role: result.role }, process.env.REFRESH_TOKEN_SECRET, '30d')
        res.cookie("refreshToken", refreshToken.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 3600 * 1000
        });
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});

router.post('/account-setup/:id', async (req, res) => {
    const { id, } = req.params;
    try {
        const result = await service.setupAccount(id, req.body);
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await service.login(username, password);

        const refreshToken = await generateToken({ phoneNumber: result.phoneNumber, role: result.role }, process.env.REFRESH_TOKEN_SECRET, '30d')
        res.cookie("refreshToken", refreshToken.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 3600 * 1000
        });
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
router.post('/logout', async (req, res) => {
    try {

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7* 3600* 1000
        });
        successResponse(res, { message: 'Logged out successfully' });
    } catch (error) {
        errorResponse(res, error);
    }
});
router.get('/refresh', async (req, res) => {
    const { refreshToken } = req.cookies
    try {
        const result = await service.refresh(refreshToken);
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});

export const authenRouter = router;


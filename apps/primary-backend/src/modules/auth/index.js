import express from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "./service.js";
import { authMiddleware } from "../../middleware/authMidlleware.js";
import { AuthModel } from "./model.js";
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
router.post("/sign-up", async (req, res) => {
    const parsed = AuthModel.signupSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid request body",
        });
    }
    const { email, password } = parsed.data;
    try {
        const userId = await AuthService.signup(email, password);
        const response = {
            id: userId,
        };
        return res.status(200).json(response);
    }
    catch (e) {
        console.error(e);
        const errorResponse = {
            message: "Error while signing up",
        };
        return res.status(400).json(errorResponse);
    }
});
router.post("/sign-in", async (req, res) => {
    const parsed = AuthModel.signinSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid request body",
        });
    }
    const { email, password } = parsed.data;
    const { correctCredentials, userId } = await AuthService.signin(email, password);
    if (correctCredentials && userId) {
        const token = jwt.sign({ userId }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("auth", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const response = {
            message: "Signed in successfully",
        };
        return res.status(200).json(response);
    }
    const failure = {
        message: "Incorrect credentials",
    };
    return res.status(403).json(failure);
});
router.get("/profile", authMiddleware, async (req, res) => {
    const userData = await AuthService.getUserDetails(Number(req.userId));
    if (!userData) {
        const errorResponse = {
            message: "Error while fetching user details",
        };
        return res.status(400).json(errorResponse);
    }
    const response = userData;
    return res.status(200).json(response);
});
export default router;

import { z } from "zod";
export var AuthModel;
(function (AuthModel) {
    AuthModel.signinSchema = z.object({
        email: z.string(),
        password: z.string(),
    });
    AuthModel.signinResponseSchema = z.object({
        message: z.literal("Signed in successfully"),
    });
    AuthModel.signinFailureSchema = z.object({
        message: z.literal("Incorrect credentials"),
    });
    AuthModel.signupSchema = z.object({
        email: z.string(),
        password: z.string(),
    });
    AuthModel.signupResponseSchema = z.object({
        id: z.string(),
    });
    AuthModel.signupFailedResponseSchema = z.object({
        message: z.literal("Error while signing up"),
    });
    AuthModel.profileResponseSchema = z.object({
        credits: z.number(),
    });
    AuthModel.profileResponseErrorSchema = z.object({
        message: z.literal("Error while fetching user details"),
    });
})(AuthModel || (AuthModel = {}));

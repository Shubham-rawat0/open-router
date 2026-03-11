import { z } from "zod";

export namespace AuthModel {

  export const signinSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  export type SigninSchema = z.infer<typeof signinSchema>;

  export const signinResponseSchema = z.object({
    
    message: z.literal("Signed in successfully"),
  });

  export type SigninResponseSchema = z.infer<typeof signinResponseSchema>;

  export const signinFailureSchema = z.object({
    message: z.literal("Incorrect credentials"),
  });

  export type SigninFailureSchema = z.infer<typeof signinFailureSchema>;


  export const signupSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  export type SignupSchema = z.infer<typeof signupSchema>;

  export const signupResponseSchema = z.object({
    id: z.string(),
  });

  export type SignupResponseSchema = z.infer<typeof signupResponseSchema>;

  export const signupFailedResponseSchema = z.object({
    message: z.literal("Error while signing up"),
  });

  export type SignupFailedResponseSchema = z.infer<
    typeof signupFailedResponseSchema
  >;


  export const profileResponseSchema = z.object({
    credits: z.number(),
  });

  export type ProfileResponseSchema = z.infer<typeof profileResponseSchema>;

  export const profileResponseErrorSchema = z.object({
    message: z.literal("Error while fetching user details"),
  });

  export type ProfileResponseErrorSchema = z.infer<
    typeof profileResponseErrorSchema
  >;
}

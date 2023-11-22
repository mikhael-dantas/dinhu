import { DINHUAPIResponseSchema } from "@/server/api.services"
import { User } from "@/server/modules/user/user.entity"
import * as z from "zod"

//! SignIn AREA
export const signInSchema = z.object({
  emailOrAccount: z.string({ required_error: "E-mail é obrigatório" }),
  password: z.string({ required_error: "A senha é obrigatória" }),
})
export type SignInSchemaType = z.infer<typeof signInSchema>

export type SignInResponse = DINHUAPIResponseSchema<
  Omit<User, "password" | "sys_blocked"> & {
    token: string
  }
>

//! SignUp AREA
export type SignUpResponse = SignInResponse

export const signUpSchema = z.object({
  avatar: z.string({ required_error: "O avatar é obrigatório" }),
  username: z.string({ required_error: "Username é obrigatório" }),
  firstname: z.string({ required_error: "O primeiro nome é obrigatório" }),
  lastname: z.string({ required_error: "O último nome é obrigatório" }),
  email: z.string({ required_error: "E-mail é obrigatório" }),
  password: z.string({ required_error: "A senha é obrigatória" }),
})
export type SignUpSchemaType = z.infer<typeof signUpSchema>

//! Password AREA
export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: "E-mail é obrigatório" }),
})
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
  password: z.string({ required_error: "A senha é obrigatória" }),
})
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

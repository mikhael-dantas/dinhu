import { lazy } from "react"
import type { Routes } from "@/@types/routes"

const authRoute: Routes = [
  {
    key: "signIn",
    path: `/sign-in`,
    // component: lazy(() => import("@/views/auth/SignIn")),
    component: lazy(() => import("./test")),
    authority: [],
  },
  {
    key: "signUp",
    path: `/sign-up`,
    // component: lazy(() => import("@/views/auth/SignUp")),
    component: lazy(() => import("./test")),
    authority: [],
  },
  {
    key: "forgotPassword",
    path: `/forgot-password`,
    // component: lazy(() => import("@/views/auth/ForgotPassword")),
    component: lazy(() => import("./test")),
    authority: [],
  },
  {
    key: "resetPassword",
    path: `/reset-password`,
    // component: lazy(() => import("@/views/auth/ResetPassword")),
    component: lazy(() => import("./test")),
    authority: [],
  },
]

export default authRoute

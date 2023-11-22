"use server"
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"
import { User } from "../user/user.entity"
import { verify } from "jsonwebtoken"

export async function SignInCookies(data: {
  user: Omit<User, "password" | "sys_blocked">
  token: string
}): Promise<void> {
  const cookiesStore: RequestCookies = cookies() as any
  cookiesStore.set({
    name: "token",
    value: data.token,
  })
  cookiesStore.set({
    name: "user",
    value: JSON.stringify(data.user),
  })
}

export async function SignOutCookies() {
  const cookiesStore: RequestCookies = cookies() as any
  cookiesStore.delete("token")
  cookiesStore.delete("user")
}

export async function DINHUServerGetAuthCookies(): Promise<{ user?: Omit<User, "password">; token?: string }> {
  const cookiesStore: RequestCookies = cookies() as any
  const token = cookiesStore.get("token")?.value
  const rawUser = cookiesStore.get("user")?.value
  if (!rawUser || !token) {
    return {}
  }
  const user = JSON.parse(rawUser)
  return { user, token }
}

export async function isPermittedFromRolesAuth(roles: string[]): Promise<boolean> {
  try {
    const token = cookies().get("token")?.value
    const rawUser = cookies().get("user")?.value
    if (!rawUser || !token) {
      throw new Error("Cookies not found")
    }
    const user = JSON.parse(rawUser)

    if (!user) {
      throw new Error("User not found")
    }
    if (!roles.includes(user.role.name)) {
      throw new Error("User not permitted")
    }
    const secret = "qwertyuiop"
    if (!secret) {
      console.log("Secret not found in env")
      throw new Error("Secret not found")
    }

    const decoded: any = verify(token, secret)
    if (!decoded) {
      console.log("Invalid token")
      throw new Error("Invalid token")
    }
    // check expiration
    const current_time = Math.floor(Date.now() / 1000)
    if (decoded.exp < current_time) {
      console.log("Expired token")
      throw new Error("Expired token")
    }
    return true
  } catch (error) {
    return false
  }
}

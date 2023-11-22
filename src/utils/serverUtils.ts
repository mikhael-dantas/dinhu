"use server"

import { User } from "@/server/modules/user/user.entity"
import { cookies } from "next/headers"

export const ServerUtilGetUserFromCookies = (): User | undefined => {
  try {
    return JSON.parse(cookies().get("user")?.value!)
  } catch (error) {
    return undefined
  }
}

export async function getDotEnvToClient() {
  return process.env["CLIENT_API_FILE"]
}

export async function isDateExpired(dateExp: any) {
  dateExp = new Date(dateExp).toLocaleTimeString("pt-BR")
  dateExp = dateExp.split(" ")[0] + " " + "23:59:59"
  dateExp = new Date(dateExp).getTime()
  let date2: any = new Date().toLocaleString("pt-BR")
  date2 = new Date(date2).getTime()

  if (date2 > dateExp) return true
  else return false
}

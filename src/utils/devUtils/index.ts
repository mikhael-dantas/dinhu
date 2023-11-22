import { toast } from "react-toastify"

export const devUILog = (message: string) => {
  toast(message)
  console.log(message)
}

export const devServerLog = (message: any) => {
  console.log(message)
}

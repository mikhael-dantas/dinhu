import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const Utils = {
  format: {
    maskCentsToCash: function integerCentsToCurrency(value: number) {
      value = value / 100
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    },
    maskPhone: (value: string) => {
      const cleanNumber = value.replace(/\D/g, "")
      const elevenDigitFormattedNumber = cleanNumber.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")

      return elevenDigitFormattedNumber
    },
    maskCPForCNPJ: (value: string) => {
      if (!value) return ""
      value = value.replace(/\D/g, "")
      if (value.length <= 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      }

      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    },
    maskDateToUser: function formatCDateOrString(value: string | Date): string {
      value = new Date(value)
      return value.toLocaleDateString("pt-BR")
    },
    maskDateToServer: function formatCDateOrString(value: string | Date): string {
      value = new Date(value)
      return value.toISOString()
    },
  },
  jwtCheck: {
    isValid: (token: string | null) => {
      if (!token) return false
      try {
        const decoded: any = jwt.decode(token)
        if (!decoded) return false
        // check expiration
        const current_time = Math.floor(Date.now() / 1000)
        if (decoded.exp < current_time) return false
        return true
      } catch (error) {
        return false
      }
    },
  },
}

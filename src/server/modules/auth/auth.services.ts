import { API_BASE_URL } from "@/constants/api.constant"
import { SignInResponse, SignInSchemaType } from "./auth.entity"
import { DINHUServerGetAuthCookies } from "./functions"
import { User, UserCreateModelSchemaType, UserUpdateModelSchemaType } from "../user/user.entity"
import { RolesEnum, ScopesEnum } from "@/constants/roles.constant"
import { DINHUAPIResponseSchema, apiUrls } from "@/server/api.services"
import { Company, CompanyCreateSchemaType, CompanyUpdateSchemaType } from "../company/company.entity"

/**
 * export const apiUrls = {
  company: {
    getAll: "/api/Empresa/GetAll",
    getById: (id: number) => `/api/Empresa/GetById/${id}`,
    create: "/api/Empresa/Create",
    update: "/api/Empresa/Update",
    delete: (id: number) => `/api/Empresa/Delete/${id}`,
  },
  usuario: {
    authenticate: "/api/Usuario/Authenticate",
    getAll: "/api/Usuario/GetAll",
    getById: (id: number) => `/api/Usuario/GetById/${id}`,
    getByEmail: (email: string) => `/api/Usuario/GetByEmail/${email}`,
    getByConta: (conta: string) => `/api/Usuario/GetByConta/${conta}`,
    create: "/api/Usuario/Create",
    update: "/api/Usuario/Update",
    delete: (id: number) => `/api/Usuario/Delete/${id}`,
  },
}
export enum DINHUAPIEnum {
  getAllCompany = "getAllCompany",
  getByIdCompany = "getByIdCompany",
  createCompany = "createCompany",
  updateCompany = "updateCompany",
  deleteCompany = "deleteCompany",
  authenticateUsuario = "authenticateUsuario",
  getAllUsuario = "getAllUsuario",
  getByIdUsuario = "getByIdUsuario",
  getByEmailUsuario = "getByEmailUsuario",
  getByContaUsuario = "getByContaUsuario",
  createUsuario = "createUsuario",
  updateUsuario = "updateUsuario",
  deleteUsuario = "deleteUsuario",
}

export interface DINHUAPIResponseSchema<T> {
  sucess: boolean
  data: {
    success: boolean
    detail?: string
    instance?: string
  } & T
}

 */

const genericFetch = async (path: string, method: string, data?: any) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await DINHUServerGetAuthCookies()).token}`,
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

export async function DINHUAPISignIn(data: SignInSchemaType): Promise<SignInResponse> {
  const url = apiUrls.usuario.authenticate
  const res = await genericFetch(url, "POST", {
    conta_ou_email: data.emailOrAccount,
    senha: data.password,
  })

  res.data.authority = [RolesEnum.ADMINISTRATION, ScopesEnum.ADMIN]

  return res
}

// export async function DINHUAPISignUp(data: SignUpSchemaType): Promise<SignUpResponse> {
//   const response = await fetch(`${API_BASE_URL}/signUp`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${(await DINHUServerGetAuthCookies()).token}`,
//     },
//     body: JSON.stringify(data),
//   })
//   return await response.json()
// }

export async function DINHUAPIGetUsers(): Promise<DINHUAPIResponseSchema<User[]>> {
  const url = apiUrls.usuario.getAll
  const res = await genericFetch(url, "GET")
  return res
}

export async function DINHUAPIGetUserById(id: number): Promise<DINHUAPIResponseSchema<User>> {
  const url = apiUrls.usuario.getById(id)
  const res = await genericFetch(url, "GET")
  return res
}

export async function DINHUAPIGetUserByEmail(email: string): Promise<DINHUAPIResponseSchema<User>> {
  const url = apiUrls.usuario.getByEmail(email)
  const res = await genericFetch(url, "GET")
  return res
}

export async function DINHUAPIGetUserByConta(conta: string): Promise<DINHUAPIResponseSchema<User>> {
  const url = apiUrls.usuario.getByConta(conta)
  const res = await genericFetch(url, "GET")
  return res
}

export async function DINHUAPICreateUser(data: UserCreateModelSchemaType): Promise<DINHUAPIResponseSchema<User>> {
  const url = apiUrls.usuario.create
  const res = await genericFetch(url, "POST", {
    ...data,
  })
  return res
}

export async function DINHUAPIUpdateUser(data: UserUpdateModelSchemaType): Promise<DINHUAPIResponseSchema<User>> {
  const url = apiUrls.usuario.update
  const res = await genericFetch(url, "PUT", {
    ...data,
  })
  return res
}

export async function DINHUAPIDelUser(id: number): Promise<DINHUAPIResponseSchema<User>> {
  const url = apiUrls.usuario.delete(id)
  const res = await genericFetch(url, "DELETE")
  return res
}

export async function DINHUAPIGetCompanies(): Promise<DINHUAPIResponseSchema<Company[]>> {
  const url = apiUrls.company.getAll
  const res = await genericFetch(url, "GET")
  return res
}

export async function DINHUAPIGetCompanyById(id: number): Promise<DINHUAPIResponseSchema<Company>> {
  const url = apiUrls.company.getById(id)
  const res = await genericFetch(url, "GET")
  return res
}

export async function DINHUAPICreateCompany(data: CompanyCreateSchemaType): Promise<DINHUAPIResponseSchema<Company>> {
  const url = apiUrls.company.create
  const res = await genericFetch(url, "POST", {
    ...data,
  })
  return res
}

export async function DINHUAPIUpdateCompany(data: CompanyUpdateSchemaType): Promise<DINHUAPIResponseSchema<Company>> {
  const url = apiUrls.company.update
  const res = await genericFetch(url, "PUT", {
    ...data,
  })
  return res
}

export async function DINHUAPIDelCompany(id: number): Promise<DINHUAPIResponseSchema<Company>> {
  const url = apiUrls.company.delete(id)
  const res = await genericFetch(url, "DELETE")
  return res
}

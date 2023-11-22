export const apiUrls = {
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
  success: boolean
  data: {
    success: boolean
    detail?: string
    instance?: string
  } & T
}

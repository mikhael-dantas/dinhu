export enum RolesEnum {
  ADMINISTRATION = "Administração",
  DIRECTORS = "Diretoria",
  MANAGERS = "Gerência",
  COLABORATORS = "Colaboradores",
  USERS = "Usuários",
}
export enum ScopesEnum {
  ADMIN = "admin",
  ALL = "all",
  CRM = "crm",
  SALES = "sales",
}

export const RolesHierarchy = {
  [RolesEnum.ADMINISTRATION]: [RolesEnum.DIRECTORS, RolesEnum.MANAGERS, RolesEnum.COLABORATORS, RolesEnum.USERS],
  [RolesEnum.DIRECTORS]: [RolesEnum.MANAGERS, RolesEnum.COLABORATORS, RolesEnum.USERS],
  [RolesEnum.MANAGERS]: [RolesEnum.COLABORATORS, RolesEnum.USERS],
  [RolesEnum.COLABORATORS]: [RolesEnum.USERS],
  [RolesEnum.USERS]: [],
}

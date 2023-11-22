import { RolesEnum, ScopesEnum } from "@/constants/roles.constant"
import * as z from "zod"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useConfig } from "@/components/uiElstar/ConfigProvider"
import { Input } from "@/components/uiElstar"

export type User = {
  id: string
  nome: string
  email: string
  password: string
  conta: string
  sys_blocked: boolean
  authority: RolesEnum[] | ScopesEnum[]
}

const GenericHeader = (name: string) => {
  return ({ column }: { column: any }) => {
    const { themeColor, primaryColorLevel } = useConfig()
    return (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        {name}
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${column.getIsSorted() ? `text-${themeColor}-${primaryColorLevel}` : ``}`}
        />
      </Button>
    )
  }
}

const GenericCell = (name: string) => {
  return ({ row }: { row: any }) => {
    return <div className={`flex items-center justify-center`}>{row.getValue(name)}</div>
  }
}

//! List Page
export const userColumns: ColumnDef<Omit<User, "authority" | "password">>[] = [
  {
    accessorKey: "nome",
    header: GenericHeader("Nome"),
    cell: ({ row }) => (
      <div className={`flex items-center justify-start gap-2 sm:ml-4`}>
        <i className="fas fa-user" />
        {row.getValue("nome")}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: GenericHeader("Email"),
    cell: GenericCell("email"),
    enableSorting: true,
  },
  {
    accessorKey: "conta",
    header: GenericHeader("Conta"),
    cell: GenericCell("conta"),
    enableSorting: true,
  },
  {
    accessorKey: "sys_blocked",
    header: GenericHeader("Bloqueado"),
    cell: ({ row }) => (
      <div className={`flex items-center justify-center`}>{row.getValue("sys_blocked") ? "Sim" : "Não"}</div>
    ),
    enableSorting: true,
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className={`h-8 w-8 p-0`}>
  //             <span className={`sr-only`}>Open menu</span>
  //             <MoreHorizontal className={`h-4 w-4`} />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
// type UserCreateModel = {
//   nome: string
//   email: string
//   conta: string
//   senha: string
//   confirmacaoSenha: string
//   sys_Blocked: boolean
// }

// type UserUpdateModel = {
//   id: number
//   nome?: string | null
//   email?: string | null
//   conta?: string | null
//   senha?: string | null
//   confirmacaoSenha?: string | null
//   sys_Blocked?: boolean | null
// }

//! CREATE AREA
export const UserCreateModelSchema = z
  .object({
    nome: z.string(),
    email: z.string().email({
      message: "O email é inválido",
    }),
    conta: z.string(),
    senha: z.string(),
    confirmacaoSenha: z.string(),
    sys_Blocked: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.senha !== data.confirmacaoSenha) {
        return false
      }
      return true
    },
    {
      path: ["confirmacaoSenha"],
      message: "A confirmação de senha não confere",
    }
  )
export type UserCreateModelSchemaType = z.infer<typeof UserCreateModelSchema>

export const userCreateFormInfo = [
  [
    {
      label: "Nome",
      name: "nome",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Nome"
            {...register("nome", { required: "O nome é obrigatório" })}
            error={errors.nome}
          />
          {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
        </div>
      ),
    },
  ],
  [
    {
      label: "Email",
      name: "email",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Email"
            {...register("email", { required: "O email é obrigatório" })}
            error={errors.email}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
      ),
    },
  ],
  [
    {
      label: "Conta",
      name: "conta",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Conta"
            {...register("conta", { required: "A conta é obrigatória" })}
            error={errors.conta}
          />
          {errors.conta && <span className="text-red-500">{errors.conta.message}</span>}
        </div>
      ),
    },
  ],
  [
    {
      label: "Senha",
      name: "senha",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="password"
            placeholder="Senha"
            {...register("senha", { required: "A senha é obrigatória" })}
            error={errors.senha}
          />
          {errors.senha && <span className="text-red-500">{errors.senha.message}</span>}
        </div>
      ),
    },
  ],
  [
    {
      label: "Confirmação de Senha",
      name: "confirmacaoSenha",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="password"
            placeholder="Confirmação de Senha"
            {...register("confirmacaoSenha", { required: "A confirmação de senha é obrigatória" })}
            error={errors.confirmacaoSenha}
          />
          {errors.confirmacaoSenha && <span className="text-red-500">{errors.confirmacaoSenha.message}</span>}
        </div>
      ),
    },
  ],
]

export const UserUpdateModelSchema = z
  .object({
    id: z.number({ required_error: "O id é obrigatório" }),
    nome: z.string().optional(),
    email: z
      .string()
      .email({
        message: "O email é inválido",
      })
      .optional(),
    conta: z.string().optional(),
    senha: z.string().optional(),
    confirmacaoSenha: z.string().optional(),
    sys_Blocked: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.senha !== data.confirmacaoSenha) {
        return false
      }
      return true
    },
    {
      path: ["confirmacaoSenha"],
      message: "A confirmação de senha não confere",
    }
  )

export type UserUpdateModelSchemaType = z.infer<typeof UserUpdateModelSchema>

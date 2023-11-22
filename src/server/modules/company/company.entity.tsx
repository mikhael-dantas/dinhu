import { Button } from "@/components/ui/button"
import { Input } from "@/components/uiElstar"
import { useConfig } from "@/components/uiElstar/ConfigProvider"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { z } from "zod"

export type Company = {
  id: number
  razao_Social?: string | null
  nome_Fantasia?: string | null
  cnpj?: string | null
  inscricao_Estadual?: string | null
  endereco?: string | null
  cidade?: string | null
  estado?: string | null
  cep?: string | null
  telefone?: string | null
  email?: string | null
  data_Fundacao?: string | null // date-time
  segmento?: string | null
  porte?: string | null
  site?: string | null
  sys_Blocked?: boolean | null
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

export const companyColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "razao_social",
    header: GenericHeader("Razão Social"),
    cell: GenericCell("razao_social"),
    enableSorting: true,
  },
  {
    accessorKey: "nome_fantasia",
    header: GenericHeader("Nome Fantasia"),
    cell: GenericCell("nome_fantasia"),
    enableSorting: true,
  },
  {
    accessorKey: "cnpj",
    header: GenericHeader("CNPJ"),
    cell: GenericCell("cnpj"),
    enableSorting: true,
  },
  {
    accessorKey: "estado",
    header: GenericHeader("Estado"),
    cell: GenericCell("estado"),
    enableSorting: true,
  },

  {
    accessorKey: "telefone",
    header: GenericHeader("Telefone"),
    cell: GenericCell("telefone"),
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: GenericHeader("Email"),
    cell: GenericCell("email"),
    enableSorting: true,
  },
  {
    accessorKey: "data_fundacao",
    header: GenericHeader("Data Fundação"),
    cell: GenericCell("data_fundacao"),
    enableSorting: true,
  },
  {
    accessorKey: "porte",
    header: GenericHeader("Porte"),
    cell: GenericCell("porte"),
    enableSorting: true,
  },
  {
    accessorKey: "site",
    header: GenericHeader("Site"),
    cell: GenericCell("site"),
    enableSorting: true,
  },
  {
    accessorKey: "sys_blocked",
    header: GenericHeader("Bloqueada"),
    cell: ({ row }) => (
      <div className={`flex items-center justify-center`}>{row.getValue("sys_blocked") ? "Sim" : "Não"}</div>
    ),
    enableSorting: true,
  },
]

/**export const userCreateFormInfo = [
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
] */

export const CompanyCreateModelSchema = z.object({
  razao_Social: z.string(),
  nome_Fantasia: z.string(),
  cnpj: z.string().refine((cnpj) => cnpj.length === 14, { message: "O CNPJ deve ter 14 dígitos" }),
  inscricao_Estadual: z.string(),
  endereco: z.string(),
  cidade: z.string(),
  estado: z.string().max(2, "O estado deve ter 2 Letras"),
  cep: z.string().refine((cep) => cep.length === 8, { message: "O CEP deve ter 8 dígitos" }),
  telefone: z.string(),
  email: z.string().email(),
  data_Fundacao: z.string(), // date-time
  segmento: z.string(),
  porte: z.string(),
  site: z.string(),
  sys_Blocked: z.boolean().default(false),
})

export const CompanyCreateFormInfo = [
  [
    {
      label: "Razão Social",
      name: "razao_Social",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1 col-span-2">
          <Input
            suffix={
              <div className="flex items-center justify-center w-8 h-8 text-gray-400">
                <i className="fa fa-user w-8 h-8"></i>
              </div>
            }
            type="text"
            placeholder="Razão Social"
            {...register("razao_Social", { required: "A razão social é obrigatória" })}
            error={errors.razao_Social}
          />
          {errors.razao_Social && <span className="text-red-500">{errors.razao_Social.message}</span>}
        </div>
      ),
      colSpan: 2,
    },
    {
      label: "Nome Fantasia",
      name: "nome_Fantasia",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Nome Fantasia"
            {...register("nome_Fantasia", { required: "O nome fantasia é obrigatório" })}
            error={errors.nome_Fantasia}
          />
          {errors.nome_Fantasia && <span className="text-red-500">{errors.nome_Fantasia.message}</span>}
        </div>
      ),
    },
    {
      label: "CNPJ",
      name: "cnpj",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="CNPJ"
            {...register("cnpj", { required: "O CNPJ é obrigatório" })}
            error={errors.cnpj}
          />
          {errors.cnpj && <span className="text-red-500">{errors.cnpj.message}</span>}
        </div>
      ),
    },
  ],
  [
    {
      label: "Inscrição Estadual",
      name: "inscricao_Estadual",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Inscrição Estadual"
            {...register("inscricao_Estadual", { required: "A inscrição estadual é obrigatória" })}
            error={errors.inscricao_Estadual}
          />
          {errors.inscricao_Estadual && <span className="text-red-500">{errors.inscricao_Estadual.message}</span>}
        </div>
      ),
    },
    {
      label: "Endereço",
      name: "endereco",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1 col-span-2">
          <Input
            type="text"
            placeholder="Endereço"
            {...register("endereco", { required: "O endereço é obrigatório" })}
            error={errors.endereco}
          />
          {errors.endereco && <span className="text-red-500">{errors.endereco.message}</span>}
        </div>
      ),
      colSpan: 2,
    },
    {
      label: "Cidade",
      name: "cidade",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Cidade"
            {...register("cidade", { required: "A cidade é obrigatória" })}
            error={errors.cidade}
          />
          {errors.cidade && <span className="text-red-500">{errors.cidade.message}</span>}
        </div>
      ),
    },
  ],
  [
    {
      label: "Estado",
      name: "estado",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Estado"
            {...register("estado", { required: "O estado é obrigatório" })}
            error={errors.estado}
          />
          {errors.estado && <span className="text-red-500">{errors.estado.message}</span>}
        </div>
      ),
    },
    {
      label: "CEP",
      name: "cep",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="CEP"
            {...register("cep", { required: "O CEP é obrigatório" })}
            error={errors.cep}
          />
          {errors.cep && <span className="text-red-500">{errors.cep.message}</span>}
        </div>
      ),
    },
    {
      label: "Telefone",
      name: "telefone",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Telefone"
            {...register("telefone", { required: "O telefone é obrigatório" })}
            error={errors.telefone}
          />
          {errors.telefone && <span className="text-red-500">{errors.telefone.message}</span>}
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
    {
      label: "Data Fundação",
      name: "data_Fundacao",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="date"
            placeholder="Data Fundação"
            {...register("data_Fundacao", { required: "A data de fundação é obrigatória" })}
            error={errors.data_Fundacao}
          />
          {errors.data_Fundacao && <span className="text-red-500">{errors.data_Fundacao.message}</span>}
        </div>
      ),
    },
    {
      label: "Segmento",
      name: "segmento",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Segmento"
            {...register("segmento", { required: "O segmento é obrigatório" })}
            error={errors.segmento}
          />
          {errors.segmento && <span className="text-red-500">{errors.segmento.message}</span>}
        </div>
      ),
    },
  ],
  [
    {
      label: "Porte",
      name: "porte",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Porte"
            {...register("porte", { required: "O porte é obrigatório" })}
            error={errors.porte}
          />
          {errors.porte && <span className="text-red-500">{errors.porte.message}</span>}
        </div>
      ),
    },
    {
      label: "Site",
      name: "site",
      component: ({ register, errors }: any) => (
        <div className="flex flex-col space-y-1">
          <Input
            type="text"
            placeholder="Site"
            {...register("site", { required: "O site é obrigatório" })}
            error={errors.site}
          />
          {errors.site && <span className="text-red-500">{errors.site.message}</span>}
        </div>
      ),
    },
  ],
]

export type CompanyCreateSchemaType = z.infer<typeof CompanyCreateModelSchema>

export const CompanyUpdate = z.object({
  id: z.number({ required_error: "O id é obrigatório" }),
  razao_Social: z.string().optional(),
  nome_Fantasia: z.string().optional(),
  cnpj: z.string().optional(),
  inscricao_Estadual: z.string().optional(),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().optional(),
  data_Fundacao: z.string().optional(), // date-time
  segmento: z.string().optional(),
  porte: z.string().optional(),
  site: z.string().optional(),
  sys_Blocked: z.boolean().optional(),
})

export type CompanyUpdateSchemaType = z.infer<typeof CompanyUpdate>

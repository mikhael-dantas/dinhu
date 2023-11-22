import { Button } from "@/components/uiElstar"
import { useConfig } from "@/components/uiElstar/ConfigProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import DINHU1Header from "./Header"

export const DINHU1CreatePage: React.FC<{
  data: {
    label: string
    name: string
    colSpan?: number
    component: (props: any) => JSX.Element
  }[][]
  submitFn: (data: any) => void
  schema: any
  entityName: {
    singular: string
    plural: string
  }
  span?: number
}> = ({ data, submitFn, schema, entityName, span }) => {
  const { primaryColorLevel, themeColor } = useConfig()
  const maxSpan = data.reduce((acc, row) => {
    const rowSpan = row.reduce((acc, col) => {
      return acc + (col.colSpan || 1)
    }, 0)
    return acc < rowSpan ? rowSpan : acc
  }, 0)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
  })
  const onSubmit = async (data: any) => {
    submitFn(data)
  }

  // use grid

  return (
    <>
      <DINHU1Header name={"Incluir " + entityName.singular} />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full max-w-[90%]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {data.map((row, index) => (
              <div key={index} className={`grid grid-cols-${span || 1} gap-4`}>
                {row.map((col, index) => (
                  <div key={index}>{col.component({ register, errors })}</div>
                ))}
              </div>
            ))}
            <div className="flex flex-row items-center justify-center w-full">
              <Button type="submit" className={`w-[50%] bg-${themeColor}-${primaryColorLevel} hover:opacity-90`}>
                <span>Criar {entityName.singular}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export const DINHU1ViewAndUpdatePage: React.FC<{
  data: {
    label: string
    name: string
    colSpan?: number
    component: (props: any) => JSX.Element
  }[][]
  submitFn: (data: any) => void
  schema: any
  entityName: {
    singular: string
    plural: string
  }
  edit?: boolean
}> = ({ data, submitFn, schema, entityName, edit }) => {
  const { primaryColorLevel, themeColor } = useConfig()
  const maxSpan = data.reduce((acc, row) => {
    const rowSpan = row.reduce((acc, col) => {
      return acc + (col.colSpan || 1)
    }, 0)
    return acc < rowSpan ? rowSpan : acc
  }, 0)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
  })
  const onSubmit = async (data: any) => {
    submitFn(data)
  }

  // use grid

  return (
    <>
      <DINHU1Header name={(edit ? "Editar " : "Visualizar ") + entityName.singular} />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full max-w-[90%]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {data.map((row, index) => (
              <div key={index} className={`grid grid-cols-${maxSpan} gap-4`}>
                {row.map((col, index) => (
                  <div key={index}>{col.component({ register, errors, edit })}</div>
                ))}
              </div>
            ))}
            <div className="flex flex-row items-center justify-center w-full">
              {edit && (
                <Button type="submit" className={`w-[50%] bg-${themeColor}-${primaryColorLevel} hover:opacity-90`}>
                  <span>Editar {entityName.singular}</span>
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

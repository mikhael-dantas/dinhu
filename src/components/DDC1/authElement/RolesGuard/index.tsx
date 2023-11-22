import { RolesEnum } from "@/constants/roles.constant"
import { isPermittedFromRolesAuth } from "@/server/modules/auth/functions"
import { devServerLog } from "@/utils/devUtils"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export const RolesGuard: React.FC<
  React.PropsWithChildren<{
    roles: RolesEnum[]
    redirection?: string
  }>
> = async ({ children, roles, redirection }) => {
  devServerLog("oi")
  const permitted = await isPermittedFromRolesAuth(roles)
  devServerLog("bue")

  if (!permitted) {
    if (redirection) {
      redirect(redirection)
    }
    return null
  }
  return <>{children}</>
}

interface ContainerProps extends React.SuspenseProps {
  roles: RolesEnum[]
  redirection?: string
}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  roles,
  redirection,
  ...rest
}) => {
  return (
    <>
      <Suspense {...rest}>
        <RolesGuard roles={roles} redirection={redirection}>
          {children}
        </RolesGuard>
      </Suspense>
    </>
  )
}

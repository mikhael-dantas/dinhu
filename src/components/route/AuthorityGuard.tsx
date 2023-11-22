import { PropsWithChildren, useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuthority from "@/utils/hooks/useAuthority"

type AuthorityGuardProps = PropsWithChildren<{
  userAuthority?: string[]
  authority?: string[]
}>

const AuthorityGuard = (props: AuthorityGuardProps) => {
  const { userAuthority = [], authority = [], children } = props
  const router = useRouter()

  const roleMatched = useAuthority(userAuthority, authority)

  useEffect(() => {
    // Se não houver correspondência de função, redirecione para a página de acesso negado
    if (!roleMatched) {
      router.replace("/signIn")
    }
  }, [roleMatched, router])

  // Renderizar children apenas se a função corresponder
  return roleMatched ? <>{children}</> : null // Retornar null enquanto aguarda o redirecionamento
}

export default AuthorityGuard

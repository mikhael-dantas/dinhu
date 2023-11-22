import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import appConfig from "@/configs/app.config"
import { REDIRECT_URL_KEY } from "@/constants/app.constant"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = ({ children }: any) => {
  const authenticated = useSelector((state: RootState) => state.auth.session.signedIn)
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    if (!authenticated) {
      router.replace(`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${path}`)
    }
  }, [authenticated, router])

  if (!authenticated) {
    // Renderizar um fallback ou null enquanto está redirecionando ou verificando a autenticação
    return null // ou algum tipo de spinner/loading indicator
  }

  return children // Renderiza children se autenticado
}

export default ProtectedRoute

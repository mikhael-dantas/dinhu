import { useEffect } from "react"
import { useRouter } from "next/router"
import appConfig from "@/configs/app.config"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

const PublicRoute = ({ children }: any) => {
  const router = useRouter()
  const authenticated = useSelector((state: RootState) => state.auth.session.signedIn)
  const { authenticatedEntryPath } = appConfig

  useEffect(() => {
    if (authenticated) {
      router.push(authenticatedEntryPath)
    }
  }, [authenticated, router, authenticatedEntryPath])

  // Se autenticado, o useEffect fará o redirecionamento.
  // Se não, renderize os filhos (que seriam os componentes de página ou qualquer outro componente que você gostaria de exibir).
  return !authenticated ? children : null
}

export default PublicRoute

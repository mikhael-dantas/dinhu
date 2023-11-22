import Logo from "@/components/template/Logo"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

const HeaderLogo = () => {
  const mode = useSelector((state: RootState) => state.theme.mode)

  return <Logo mode={mode} className="hidden md:block" />
}

export default HeaderLogo

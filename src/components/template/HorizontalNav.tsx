"use client"
import HorizontalMenuContent from "./HorizontalMenuContent"
import useResponsive from "@/utils/hooks/useResponsive"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

const HorizontalNav = () => {
  const mode = useSelector((state: RootState) => state.theme.mode)
  const userAuthority = useSelector((state: RootState) => state.auth.user.authority)

  const { larger } = useResponsive()

  return <>{larger.md && <HorizontalMenuContent manuVariant={mode} userAuthority={userAuthority} />}</>
}

export default HorizontalNav

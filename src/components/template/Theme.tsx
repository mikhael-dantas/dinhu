import ConfigProvider from "@/components/uiElstar/ConfigProvider"
import useDarkMode from "@/utils/hooks/useDarkmode"
import type { CommonProps } from "@/@types/common"
import { themeConfig } from "@/configs/theme.config"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

const Theme = (props: CommonProps) => {
  const theme = useSelector((state: RootState) => state.theme)
  const locale = useSelector((state: RootState) => state.locale.currentLang)
  useDarkMode()

  const currentTheme = {
    ...themeConfig,
    ...theme,
    ...{ locale },
  }

  return <ConfigProvider value={currentTheme}>{props.children}</ConfigProvider>
}

export default Theme

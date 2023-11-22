import classNames from "classnames"
import { APP_NAME } from "@/constants/app.constant"
import type { CommonProps } from "@/@types/common"
import { useConfig } from "../uiElstar/ConfigProvider"

interface LogoProps extends CommonProps {
  type?: "full" | "streamline"
  mode?: "light" | "dark"
  imgClass?: string
  logoWidth?: number | string
}

const LOGO_SRC_PATH = "/img/logo/"

const Logo = (props: LogoProps) => {
  const { type = "full", mode = "light", className, imgClass, style, logoWidth = "auto" } = props
  const { themeColor, primaryColorLevel } = useConfig()

  return (
    <div
      className={classNames("logo", className)}
      style={{
        ...style,
        ...{ width: logoWidth },
      }}
    >
      <img
        className={
          imgClass + ` object-contain max-h-[3rem] rounded-full border-2 border-${themeColor}-${primaryColorLevel}`
        }
        src={`https://media.licdn.com/dms/image/C4D0BAQG_qZlMQAs1uA/company-logo_200_200/0/1663189888551/dinhu_company_logo?e=2147483647&v=beta&t=ZCG2pM5dTYi5cxDLHvYOk0thg_c73ENL-bkyoN4p4tw`}
        alt={`${APP_NAME} logo`}
      />
      {/* <img className={imgClass} src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`} alt={`${APP_NAME} logo`} /> */}
    </div>
  )
}

export default Logo

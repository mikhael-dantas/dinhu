import { THEME_ENUM } from "@/constants/theme.constant"
import { RootState } from "@/context/redux/reducers"
import { useSelector } from "react-redux"
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react"

interface DoubleSidedImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  darkModeSrc: string
}

const { MODE_DARK } = THEME_ENUM

const DoubleSidedImage = ({ src, darkModeSrc, alt = "", ...rest }: DoubleSidedImageProps) => {
  const mode = useSelector((state: RootState) => state.theme.mode)

  return <img src={mode === MODE_DARK ? darkModeSrc : src} alt={alt} {...rest} />
}

export default DoubleSidedImage

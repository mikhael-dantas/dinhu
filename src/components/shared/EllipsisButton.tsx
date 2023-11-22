import Button from "@/components/uiElstar/Button"
import { VscEllipsis } from "react-icons/vsc"
import type { ButtonProps } from "@/components/uiElstar/Button"

type EllipsisButtonProps = ButtonProps

const EllipsisButton = (props: EllipsisButtonProps) => {
  const { shape = "circle", variant = "plain", size = "xs" } = props

  return <Button shape={shape} variant={variant} size={size} icon={<VscEllipsis />} {...props} />
}

export default EllipsisButton

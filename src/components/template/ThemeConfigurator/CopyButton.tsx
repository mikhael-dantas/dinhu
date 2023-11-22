import Notification from "@/components/uiElstar/Notification"
import Button from "@/components/uiElstar/Button"
import toast from "@/components/uiElstar/toast"
import { themeConfig } from "@/configs/theme.config"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

const CopyButton = () => {
  const theme = useSelector((state: RootState) => state.theme)

  const handleCopy = () => {
    const config = {
      ...themeConfig,
      ...theme,
      layout: {
        type: theme.layout.type,
        sideNavCollapse: theme.layout.sideNavCollapse,
      },
      panelExpand: false,
    }

    navigator.clipboard.writeText(JSON.stringify(config, null, 2))

    toast.push(
      <Notification title="Copy Success" type="success">
        {`Please replace themeConfig in 'src/configs/themeConfig.js'`}
      </Notification>,
      {
        placement: "top-center",
      }
    )
  }

  return (
    <Button block variant="solid" onClick={handleCopy}>
      Copy config
    </Button>
  )
}

export default CopyButton

import classNames from "classnames"
import Drawer from "@/components/uiElstar/Drawer"
import { HiOutlineCog } from "react-icons/hi"
import SidePanelContent, { SidePanelContentProps } from "./SidePanelContent"
import withHeaderItem from "@/utils/hoc/withHeaderItem"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"
import type { CommonProps } from "@/@types/common"
import { setPanelExpand } from "@/context/redux/reducers/theme/themeSlice"

type SidePanelProps = SidePanelContentProps & CommonProps

const _SidePanel = (props: SidePanelProps) => {
  const dispatch = useDispatch()

  const { className, ...rest } = props

  const panelExpand = useSelector((state: RootState) => state.theme.panelExpand)

  const direction = useSelector((state: RootState) => state.theme.direction)

  const openPanel = () => {
    dispatch(setPanelExpand(true))
  }

  const closePanel = () => {
    dispatch(setPanelExpand(false))
    const bodyClassList = document.body.classList
    if (bodyClassList.contains("drawer-lock-scroll")) {
      bodyClassList.remove("drawer-lock-scroll", "drawer-open")
    }
  }

  return (
    <>
      <div className={classNames("text-2xl", className)} onClick={openPanel} {...rest}>
        <HiOutlineCog />
      </div>
      <Drawer
        title="Side Panel"
        isOpen={panelExpand}
        placement={direction === "rtl" ? "left" : "right"}
        width={375}
        onClose={closePanel}
        onRequestClose={closePanel}
      >
        <SidePanelContent callBackClose={closePanel} />
      </Drawer>
    </>
  )
}

const SidePanel = withHeaderItem(_SidePanel)

export default SidePanel

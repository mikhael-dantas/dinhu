import View from "@/views"
import SidePanel from "@/components/template/SidePanel"
import { HiOutlineCog } from "react-icons/hi"
import classNames from "classnames"
import { RootState } from "@/context/redux/reducers"
import { useDispatch, useSelector } from "react-redux"
import { setPanelExpand } from "@/context/redux/reducers/theme/themeSlice"

const ConfiguratorToggle = () => {
  const dispatch = useDispatch()
  const themeColor = useSelector((state: RootState) => state.theme.themeColor)
  const primaryColorLevel = useSelector((state: RootState) => state.theme.primaryColorLevel)

  return (
    <div
      className={classNames(
        "fixed ltr:right-0 rtl:left-0 top-96 p-3 ltr:rounded-tl-md ltr:rounded-bl-md rtl:rounded-tr-md rtl:rounded-br-md text-white text-xl cursor-pointer select-none",
        `bg-${themeColor}-${primaryColorLevel}`
      )}
      onClick={() => {
        dispatch(setPanelExpand(true))
      }}
    >
      <HiOutlineCog />
    </div>
  )
}

const BlankLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-layout-blank flex flex-auto flex-col min-h-[100vh]">
      <View>{children}</View>
      <ConfiguratorToggle />
      <SidePanel className="hidden" />
    </div>
  )
}

export default BlankLayout

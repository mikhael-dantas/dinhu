import Radio from "@/components/uiElstar/Radio"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"
import { NAV_MODE_THEMED } from "@/constants/theme.constant"
import { setNavMode } from "@/context/redux/reducers/theme/themeSlice"

type NavModeParam = "default" | "themed"

const NavModeSwitcher = () => {
  const navMode = useSelector((state: RootState) => state.theme.navMode)
  const dispatch = useDispatch()

  const onSetNavMode = (val: NavModeParam) => {
    dispatch(setNavMode(val))
  }

  return (
    <Radio.Group value={navMode === NAV_MODE_THEMED ? NAV_MODE_THEMED : "default"} onChange={onSetNavMode}>
      <Radio value="default">Default</Radio>
      <Radio value={NAV_MODE_THEMED}>Themed</Radio>
    </Radio.Group>
  )
}

export default NavModeSwitcher

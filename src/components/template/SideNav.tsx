"use client"
import classNames from "classnames"
import ScrollBar from "@/components/uiElstar/ScrollBar"
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_MODE_DARK,
  NAV_MODE_THEMED,
  NAV_MODE_TRANSPARENT,
  SIDE_NAV_CONTENT_GUTTER,
  LOGO_X_GUTTER,
} from "@/constants/theme.constant"
import Logo from "@/components/template/Logo"
import navigationConfig from "@/configs/navigation.config"
import VerticalMenuContent from "@/components/template/VerticalMenuContent"
import useResponsive from "@/utils/hooks/useResponsive"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"
import { setSubstring } from "@/context/redux/reducers/search"
import { Input } from "../uiElstar"

const sideNavStyle = {
  width: SIDE_NAV_WIDTH,
  minWidth: SIDE_NAV_WIDTH,
}

const sideNavCollapseStyle = {
  width: SIDE_NAV_COLLAPSED_WIDTH,
  minWidth: SIDE_NAV_COLLAPSED_WIDTH,
}

const SideNav = () => {
  const themeColor = useSelector((state: RootState) => state.theme.themeColor)
  const primaryColorLevel = useSelector((state: RootState) => state.theme.primaryColorLevel)
  const navMode = useSelector((state: RootState) => state.theme.navMode)
  const mode = useSelector((state: RootState) => state.theme.mode)
  const direction = useSelector((state: RootState) => state.theme.direction)
  const currentRouteKey = useSelector((state: RootState) => state.base.common.currentRouteKey)
  const sideNavCollapse = useSelector((state: RootState) => state.theme.layout.sideNavCollapse)
  const userAuthority = useSelector((state: RootState) => state.auth.user.authority)
  const substring = useSelector((state: RootState) => state.searchmenu.substring)
  const dispatch = useDispatch()

  const { larger } = useResponsive()

  const sideNavColor = () => {
    if (navMode === NAV_MODE_THEMED) {
      return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
    }
    return `side-nav-${navMode}`
  }

  const logoMode = () => {
    if (navMode === NAV_MODE_THEMED) {
      return NAV_MODE_DARK
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return mode
    }

    return navMode
  }

  const menuContent = (
    <VerticalMenuContent
      navMode={navMode}
      collapsed={sideNavCollapse}
      navigationTree={navigationConfig.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(substring.toLowerCase().trim())
        const sunMenusTitleMatch = item.subMenu.find((subItem) =>
          subItem.title.toLowerCase().includes(substring.toLowerCase().trim())
        )

        return titleMatch || sunMenusTitleMatch
      })}
      routeKey={currentRouteKey}
      userAuthority={userAuthority as string[]}
      direction={direction}
    />
  )

  return (
    <>
      {larger.md && (
        <div
          style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
          className={classNames("side-nav", sideNavColor(), !sideNavCollapse && "side-nav-expand")}
        >
          <div className="side-nav-header">
            <Logo
              mode={logoMode()}
              type={sideNavCollapse ? "streamline" : "full"}
              className={(sideNavCollapse ? SIDE_NAV_CONTENT_GUTTER : LOGO_X_GUTTER) + " p-4"}
            />
          </div>
          {sideNavCollapse ? null : (
            <div className=" w-[100%] h-[3rem] px-2">
              <Input
                className={"w-[100%] h-[3rem]  rounded-lg flex items-center justify-center"}
                type="text"
                prefix={<i className="fas fa-search"></i>}
                onChange={(e) => {
                  dispatch(setSubstring(e.target.value))
                }}
              />
            </div>
          )}
          {sideNavCollapse ? (
            menuContent
          ) : (
            <div className="side-nav-content">
              <ScrollBar autoHide direction={direction}>
                {menuContent}
              </ScrollBar>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SideNav

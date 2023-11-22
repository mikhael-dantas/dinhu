"use client"
import { useState, Suspense, lazy } from "react"
import classNames from "classnames"
import Drawer from "@/components/uiElstar/Drawer"
import { NAV_MODE_THEMED, NAV_MODE_TRANSPARENT, DIR_RTL } from "@/constants/theme.constant"
import withHeaderItem, { WithHeaderItemProps } from "@/utils/hoc/withHeaderItem"
import NavToggle from "@/components/shared/NavToggle"
import navigationConfig from "@/configs/navigation.config"
import useResponsive from "@/utils/hooks/useResponsive"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

const VerticalMenuContent = lazy(() => import("@/components/template/VerticalMenuContent"))

type MobileNavToggleProps = {
  toggled?: boolean
}

const MobileNavToggle = withHeaderItem<MobileNavToggleProps & WithHeaderItemProps>(NavToggle)

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = () => {
    setIsOpen(true)
  }

  const onDrawerClose = () => {
    setIsOpen(false)
  }

  const themeColor = useSelector((state: RootState) => state.theme.themeColor)
  const primaryColorLevel = useSelector((state: RootState) => state.theme.primaryColorLevel)
  const navMode = useSelector((state: RootState) => state.theme.navMode)
  const mode = useSelector((state: RootState) => state.theme.mode)
  const direction = useSelector((state: RootState) => state.theme.direction)
  const currentRouteKey = useSelector((state: RootState) => state.base.common.currentRouteKey)
  const sideNavCollapse = useSelector((state: RootState) => state.theme.layout.sideNavCollapse)
  const userAuthority = useSelector((state: RootState) => state.auth.user.authority)
  const substring = useSelector((state: RootState) => state.searchmenu.substring)

  const { smaller } = useResponsive()

  const navColor = () => {
    if (navMode === NAV_MODE_THEMED) {
      return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return `side-nav-${mode}`
    }

    return `side-nav-${navMode}`
  }

  return (
    <>
      {smaller.md && (
        <>
          <div className="text-2xl" onClick={openDrawer}>
            <MobileNavToggle toggled={isOpen} />
          </div>
          <Drawer
            title="Navigation"
            isOpen={isOpen}
            bodyClass={classNames(navColor(), "p-0")}
            width={330}
            placement={direction === DIR_RTL ? "right" : "left"}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
          >
            <Suspense fallback={<></>}>
              {isOpen && (
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
                  onMenuItemClick={onDrawerClose}
                />
              )}
            </Suspense>
          </Drawer>
        </>
      )}
    </>
  )
}

export default MobileNav

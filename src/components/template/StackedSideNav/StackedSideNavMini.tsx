import { useEffect } from "react"
import Logo from "@/components/template/Logo"
import Menu from "@/components/uiElstar/Menu"
import ScrollBar from "@/components/uiElstar/ScrollBar"
import {
  NAV_MODE_DARK,
  NAV_MODE_THEMED,
  NAV_MODE_TRANSPARENT,
  SIDE_NAV_CONTENT_GUTTER,
} from "@/constants/theme.constant"
import { NAV_ITEM_TYPE_ITEM } from "@/constants/navigation.constant"
import AuthorityCheck from "@/components/shared/AuthorityCheck"
import navigationConfig from "@/configs/navigation.config"
import navigationIcon from "@/configs/navigation-icon.config"
import useMenuActive from "@/utils/hooks/useMenuActive"
import isEmpty from "lodash/isEmpty"
import type { NavigationTree } from "@/@types/navigation"
import type { Direction, NavMode, Mode } from "@/@types/theme"
import type { CommonProps } from "@/@types/common"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

export type SelectedMenuItem = {
  key?: string
  title?: string
  menu?: NavigationTree[]
  translateKey?: string
}

interface StackedSideNavMiniProps extends CommonProps {
  className?: string
  navMode: NavMode
  onChange: (item: SelectedMenuItem) => void
  routeKey: string
  activeKeys: string[]
  onSetActiveKey: (activeKey: string[]) => void
  userAuthority: string[]
  mode: Mode
  direction: Direction
}

const StackedSideNavMini = (props: StackedSideNavMiniProps) => {
  const { navMode, onChange, routeKey, activeKeys, onSetActiveKey, userAuthority, mode, direction, ...rest } = props

  const substring = useSelector((state: RootState) => state.searchmenu.substring)
  const { includedRouteTree } = useMenuActive(
    navigationConfig.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(substring.toLowerCase().trim())
      const sunMenusTitleMatch = item.subMenu.find((subItem) =>
        subItem.title.toLowerCase().includes(substring.toLowerCase().trim())
      )

      return titleMatch || sunMenusTitleMatch
    }),
    routeKey
  )

  const logoMode = () => {
    if (navMode === NAV_MODE_THEMED) {
      return NAV_MODE_DARK
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return mode
    }

    return navMode
  }

  const handleMenuItemSelect = ({ key, title, menu, translateKey }: SelectedMenuItem) => {
    onChange({ title, menu, translateKey })
    onSetActiveKey([key as string])
  }

  const handleLinkMenuItemSelect = ({ key }: SelectedMenuItem) => {
    onChange({})
    onSetActiveKey([key as string])
  }

  useEffect(() => {
    if (includedRouteTree.type !== NAV_ITEM_TYPE_ITEM && !isEmpty(includedRouteTree)) {
      onChange({
        key: includedRouteTree.key,
        title: includedRouteTree.title,
        menu: includedRouteTree.subMenu,
        translateKey: includedRouteTree.translateKey,
      })
    }
  }, [includedRouteTree.key])

  return (
    <div {...rest}>
      <Logo mode={logoMode()} type="streamline" className={SIDE_NAV_CONTENT_GUTTER} />
      <ScrollBar autoHide direction={direction}>
        <Menu className="px-4 pb-4" variant={navMode} defaultActiveKeys={activeKeys || [includedRouteTree.key]}>
          {navigationConfig.map((nav) => (
            <AuthorityCheck key={nav.key} authority={nav.authority} userAuthority={userAuthority}>
              {nav.subMenu && nav.subMenu.length > 0 ? (
                <Menu.MenuItem
                  eventKey={nav.key}
                  className="mb-2"
                  onSelect={() =>
                    handleMenuItemSelect({
                      key: nav.key,
                      title: nav.title,
                      menu: nav.subMenu,
                      translateKey: nav.translateKey,
                    })
                  }
                >
                  <div className="text-2xl">{navigationIcon[nav.icon]}</div>
                </Menu.MenuItem>
              ) : (
                <Link
                  href={nav.path}
                  className="flex items-center h-full w-full"
                  onClick={() =>
                    handleLinkMenuItemSelect({
                      key: nav.key,
                    })
                  }
                >
                  <Menu.MenuItem eventKey={nav.key} className="mb-2">
                    <div className="text-2xl">{navigationIcon[nav.icon]}</div>
                  </Menu.MenuItem>
                </Link>
              )}
            </AuthorityCheck>
          ))}
        </Menu>
      </ScrollBar>
    </div>
  )
}

export default StackedSideNavMini

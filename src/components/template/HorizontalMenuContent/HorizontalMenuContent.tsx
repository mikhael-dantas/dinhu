"use client"
import navigationConfig from "@/configs/navigation.config"
import Dropdown from "@/components/uiElstar/Dropdown"
import AuthorityCheck from "@/components/shared/AuthorityCheck"
import HorizontalMenuItem from "./HorizontalMenuItem"
import HorizontalMenuDropdownItem from "./HorizontalMenuDropdownItem"
import { NAV_ITEM_TYPE_TITLE, NAV_ITEM_TYPE_COLLAPSE, NAV_ITEM_TYPE_ITEM } from "@/constants/navigation.constant"
import { useTranslation } from "react-i18next"
import type { NavMode } from "@/@types/theme"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"
import { Input } from "@/components/uiElstar"
import { setSubstring } from "@/context/redux/reducers/search"
import { useDispatch } from "react-redux"

type HorizontalMenuContentProps = {
  manuVariant: NavMode
  userAuthority?: string[]
}

const HorizontalMenuContent = ({ manuVariant, userAuthority = [] }: HorizontalMenuContentProps) => {
  const { t } = useTranslation()
  const substring = useSelector((state: RootState) => state.searchmenu.substring)
  const dispatch = useDispatch()

  return (
    <span className="flex items-center">
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
      {navigationConfig
        .filter((item) => {
          const titleMatch = item.title.toLowerCase().includes(substring.toLowerCase().trim())
          const sunMenusTitleMatch = item.subMenu.find((subItem) =>
            subItem.title.toLowerCase().includes(substring.toLowerCase().trim())
          )

          return titleMatch || sunMenusTitleMatch
        })
        .map((nav) => {
          if (nav.type === NAV_ITEM_TYPE_TITLE || nav.type === NAV_ITEM_TYPE_COLLAPSE) {
            return (
              <AuthorityCheck key={nav.key} authority={nav.authority} userAuthority={userAuthority}>
                <Dropdown trigger="hover" renderTitle={<HorizontalMenuItem manuVariant={manuVariant} nav={nav} />}>
                  {nav.subMenu.map((secondarySubNav) => (
                    <AuthorityCheck
                      key={secondarySubNav.key}
                      authority={secondarySubNav.authority}
                      userAuthority={userAuthority}
                    >
                      {secondarySubNav.subMenu.length > 0 ? (
                        <Dropdown.Menu title={t(secondarySubNav.translateKey, secondarySubNav.title)}>
                          {secondarySubNav.subMenu.map((tertiarySubNav) => (
                            <AuthorityCheck
                              key={tertiarySubNav.key}
                              authority={tertiarySubNav.authority}
                              userAuthority={userAuthority}
                            >
                              <HorizontalMenuDropdownItem nav={tertiarySubNav} />
                            </AuthorityCheck>
                          ))}
                        </Dropdown.Menu>
                      ) : (
                        <HorizontalMenuDropdownItem key={secondarySubNav.key} nav={secondarySubNav} />
                      )}
                    </AuthorityCheck>
                  ))}
                </Dropdown>
              </AuthorityCheck>
            )
          }
          if (nav.type === NAV_ITEM_TYPE_ITEM) {
            return (
              <AuthorityCheck key={nav.key} authority={nav.authority} userAuthority={userAuthority}>
                <HorizontalMenuItem isLink nav={nav} manuVariant={manuVariant} />
              </AuthorityCheck>
            )
          }
          return <></>
        })}
    </span>
  )
}

export default HorizontalMenuContent

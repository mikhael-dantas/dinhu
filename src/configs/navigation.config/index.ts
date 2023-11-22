import { NAV_ITEM_TYPE_TITLE, NAV_ITEM_TYPE_ITEM, NAV_ITEM_TYPE_COLLAPSE } from "@/constants/navigation.constant"
import type { NavigationTree } from "@/@types/navigation"
import { ScopesEnum } from "@/constants/roles.constant"

const navigationConfig: NavigationTree[] = [
  {
    key: "dashboard",
    path: "/dashboard",
    title: "Dashboard",
    translateKey: "nav.dashboard",
    icon: "home",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [ScopesEnum.ALL, ScopesEnum.ADMIN],
    subMenu: [],
  },
  /** Example purpose only, please remove */
  {
    key: "system",
    path: "/dashboard/system",
    title: "Sistema",
    translateKey: "nav.system",
    icon: "singleMenu",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [ScopesEnum.ADMIN, ScopesEnum.SALES],
    subMenu: [],
  },
  {
    key: "crm",
    path: "",
    title: "CRM",
    translateKey: "nav.crm",
    icon: "collapseMenu",
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [ScopesEnum.ADMIN, ScopesEnum.CRM],
    subMenu: [
      {
        key: "crm.users",
        path: "/dashboard/crm/users",
        title: "Usuários",
        translateKey: "nav.crm.users",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ScopesEnum.ADMIN, ScopesEnum.CRM],
        subMenu: [],
      },
      {
        key: "crm.companies",
        path: "/dashboard/crm/companies",
        title: "Empresas",
        translateKey: "nav.crm.companies",
        icon: "",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ScopesEnum.ADMIN, ScopesEnum.CRM],
        subMenu: [],
      },
    ],
  },
  {
    key: "groupMenu",
    path: "",
    title: "Acompanhamento",
    translateKey: "nav.groupMenu.groupMenu",
    icon: "",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ScopesEnum.ALL, ScopesEnum.ADMIN],
    subMenu: [
      {
        key: "groupMenu.single",
        path: "/group-single-menu-item-view",
        title: "Mapeamento",
        translateKey: "nav.groupMenu.single",
        icon: "groupSingleMenu",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ScopesEnum.ALL, ScopesEnum.ADMIN],
        subMenu: [],
      },
      {
        key: "groupMenu.collapse",
        path: "",
        title: "Informações",
        translateKey: "nav.groupMenu.collapse.collapse",
        icon: "groupCollapseMenu",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ScopesEnum.ALL, ScopesEnum.ADMIN],
        subMenu: [
          {
            key: "groupMenu.collapse.item1",
            path: "/group-collapse-menu-item-view-1",
            title: "Menu item 1",
            translateKey: "nav.groupMenu.collapse.item1",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ScopesEnum.ALL, ScopesEnum.ADMIN],
            subMenu: [],
          },
          {
            key: "groupMenu.collapse.item2",
            path: "/group-collapse-menu-item-view-2",
            title: "Menu item 2",
            translateKey: "nav.groupMenu.collapse.item2",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ScopesEnum.ALL, ScopesEnum.ADMIN],
            subMenu: [],
          },
        ],
      },
    ],
  },
]

export default navigationConfig

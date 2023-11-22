import Avatar from "@/components/uiElstar/Avatar"
import Dropdown from "@/components/uiElstar/Dropdown"
import withHeaderItem from "@/utils/hoc/withHeaderItem"
import Link from "next/link"
import classNames from "classnames"
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi"
import type { CommonProps } from "@/@types/common"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"
import { useRouter } from "next/navigation"
import { SignOutCookies } from "@/server/modules/auth/functions"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { signOutSuccess } from "@/context/redux/reducers/auth"
import { useConfig } from "../uiElstar/ConfigProvider"

type DropdownList = {
  label: string
  path: string
  icon: JSX.Element
}

const dropdownItemList: DropdownList[] = []

const _UserDropdown = ({ className }: CommonProps) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const { themeColor, primaryColorLevel } = useConfig()
  const dispatch = useDispatch()
  const router = useRouter()

  const UserAvatar = (
    <div className={classNames(className, "flex items-center gap-2")}>
      {/* <Avatar size={32} shape="circle" icon={<HiOutlineUser />} /> */}
      <Avatar
        size={32}
        shape="circle"
        icon={
          <div
            className={`rounded-full  w-8 h-8 flex items-center justify-center border border-${themeColor}-${primaryColorLevel}`}
          >
            <i className="fa fa-user text-white" />
          </div>
        }
      />
      <div className="hidden md:block">
        <div className="text-xs capitalize">{user?.authority ? user?.authority[0] : ""}</div>
        <div className="font-bold">{user?.nome}</div>
      </div>
    </div>
  )

  if (!user) return null
  return (
    <div>
      <Dropdown menuStyle={{ minWidth: 240 }} renderTitle={UserAvatar} placement="bottom-end">
        <Dropdown.Item variant="header">
          <div
            className="py-2 px-3 flex items-center gap-2"
            onClick={() => {
              router.push(`/dashboard/users/${user.id}`)
            }}
          >
            <Avatar shape="circle" icon={<HiOutlineUser />} />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">{user.nome}</div>
              <div className="text-xs">{user.email}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {dropdownItemList.map((item) => (
          <Dropdown.Item key={item.label} eventKey={item.label} className="mb-1 px-0">
            <Link className="flex h-full w-full px-2" href={item.path}>
              <span className="flex gap-2 items-center w-full">
                <span className="text-xl opacity-50">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </Link>
          </Dropdown.Item>
        ))}
        {/* <Dropdown.Item variant="divider" /> */}
        <Dropdown.Item
          eventKey="Sign Out"
          className="gap-2"
          onClick={async () => {
            await SignOutCookies()
            dispatch(signOutSuccess())
            toast.success("Logout Efetuado")
            router.push("/signIn")
          }}
        >
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown

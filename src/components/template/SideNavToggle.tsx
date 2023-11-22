"use client"
import withHeaderItem from "@/utils/hoc/withHeaderItem"
import useResponsive from "@/utils/hooks/useResponsive"
import NavToggle from "@/components/shared/NavToggle"
import type { CommonProps } from "@/@types/common"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"
import { setSideNavCollapse } from "@/context/redux/reducers/theme/themeSlice"

const _SideNavToggle = ({ className }: CommonProps) => {
  const sideNavCollapse = useSelector((state: RootState) => state.theme.layout.sideNavCollapse)
  const dispatch = useDispatch()

  const { larger } = useResponsive()

  const onCollapse = () => {
    dispatch(setSideNavCollapse(!sideNavCollapse))
  }

  return (
    <>
      {larger.md && (
        <div className={className} onClick={onCollapse}>
          <NavToggle className="text-2xl" toggled={sideNavCollapse} />
        </div>
      )}
    </>
  )
}

const SideNavToggle = withHeaderItem(_SideNavToggle)

export default SideNavToggle

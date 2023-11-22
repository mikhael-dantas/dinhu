import { useEffect, useCallback } from "react"
import type { LayoutType } from "@/@types/theme"
import type { ComponentType } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usePathname, useRouter } from "next/navigation"
import { RootState } from "@/context/redux/reducers"
import { setCurrentRouteKey } from "@/context/redux/reducers/base"
import { setLayout, setPreviousLayout } from "@/context/redux/reducers/theme/themeSlice"

export type AppRouteProps<T> = {
  component: ComponentType<T>
  routeKey: string
  layout?: LayoutType
}

const AppRoute = <T extends Record<string, unknown>>({
  component: Component,
  routeKey,
  ...props
}: AppRouteProps<T>) => {
  const router = useRouter()
  const path = usePathname()

  const dispatch = useDispatch()

  const layoutType = useSelector((state: RootState) => state.theme.layout.type)
  const previousLayout = useSelector((state: RootState) => state.theme.layout.previousType)

  const handleLayoutChange = useCallback(() => {
    dispatch(setCurrentRouteKey(routeKey))

    if (props.layout && props.layout !== layoutType) {
      dispatch(setPreviousLayout(layoutType))
      dispatch(setLayout(props.layout))
    }

    if (!props.layout && previousLayout && layoutType !== previousLayout) {
      dispatch(setLayout(previousLayout))
      dispatch(setPreviousLayout(""))
    }
  }, [dispatch, layoutType, previousLayout, props.layout, routeKey])

  // Substituído useEffect com a dependência de location por router.pathname
  useEffect(() => {
    handleLayoutChange()
  }, [path, handleLayoutChange])

  return <Component {...(props as T)} />
}

export default AppRoute

import { Suspense } from "react"
import Loading from "@/components/shared/Loading"
import { protectedRoutes, publicRoutes } from "@/configs/routes.config"
import appConfig from "@/configs/app.config"
import PageContainer from "@/components/template/PageContainer"
// import ProtectedRoute from "@/components/route/ProtectedRoute"
// import PublicRoute from "@/components/route/PublicRoute"
// import AuthorityGuard from "@/components/route/AuthorityGuard"
// import AppRoute from "@/components/route/AppRoute"
import type { LayoutType } from "@/@types/theme"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"
import AppRoute from "@/components/route/AppRoute"
import AuthorityGuard from "@/components/route/AuthorityGuard"

interface ViewsProps {
  pageContainerType?: "default" | "gutterless" | "contained"
  layout?: LayoutType
  children?: React.ReactNode
}

type AllRoutesProps = ViewsProps

const { authenticatedEntryPath } = appConfig

const AllRoutes = (props: AllRoutesProps) => {
  const userAuthority = useSelector((state: RootState) => state.auth.user.authority)

  return (
    // <Routes>
    // <Route path="/" element={<ProtectedRoute />}>
    // <Route path="/" element={<Navigate replace to={authenticatedEntryPath} />} />
    // {protectedRoutes.map((route: any, index) => (
    // <Route
    // key={route.key + index}
    // path={route.path}
    // element={
    // <AuthorityGuard userAuthority={userAuthority} authority={route.authority}>
    <PageContainer {...props}>
      <AppRoute routeKey={"home"} component={() => <div>oie</div>} />
    </PageContainer>
    // </AuthorityGuard>
    // }
    // />
    // ))}
    // <Route path="*" element={<Navigate replace to="/" />} />
    // </Route>
    // <Route path="/" element={<PublicRoute />}>
    // {publicRoutes.map((route) => (
    // <Route
    // key={route.path}
    // path={route.path}
    // element={<AppRoute routeKey={route.key} component={route.component} {...route.meta} />}
    // />
    // ))}
    // </Route>
    // </Routes>
  )
}

const Views = (props: ViewsProps) => {
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <div>{props.children}</div>
      {/* <AllRoutes {...props} /> */}
    </Suspense>
  )
}

export default Views

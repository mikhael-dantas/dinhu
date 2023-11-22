import Side from "./Side"
// import Cover from './Cover'
// import Simple from './Simple'
import View from "@/views"
import { LAYOUT_TYPE_BLANK } from "@/constants/theme.constant"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

const AuthLayout = () => {
  const layoutType = useSelector((state: RootState) => state.theme.layout.type)

  return (
    <div className="app-layout-blank flex flex-auto flex-col min-h-[100vh]">
      {layoutType === LAYOUT_TYPE_BLANK ? (
        <View />
      ) : (
        <Side>
          <View />
        </Side>
      )}
    </div>
  )
}

export default AuthLayout

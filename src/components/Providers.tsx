"use client"
import store from "@/context/redux/store/configStore"
import ToastProvider from "@/context/toast"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <ToastProvider />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    </>
  )
}

export default Providers

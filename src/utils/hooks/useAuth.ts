// "use client"
// import { useDispatch, useSelector } from "react-redux"
// import { RootState } from "@/context/redux/reducers"
// import { useRouter } from "next/navigation"
// import { setUser, signOutSuccess } from "@/context/redux/reducers/auth"
// import { toast } from "react-toastify"
// import { SignInSchemaType, SignUpSchemaType } from "@/server/modules/auth/auth.entity"
// import { DINHUAPISignIn } from "@/server/modules/auth/auth.services"
// import { SignInCookies, SignOutCookies } from "@/server/modules/auth/functions"

// function useAuth() {
//   const dispatch = useDispatch()

//   const router = useRouter()

//   const { token, signedIn } = useSelector((state: RootState) => state.auth.session)

//   const { apiSignIn, apiSignUp, apiSignOut } = {
//     apiSignIn: async (data: SignInSchemaType) => {
//       DINHUAPISignIn(data)
//         .then(async (res) => {
//           if (!res.sucess) {
//             toast.error(res.data.detail || "Erro desconhecido")
//             return
//           }
//           const user = {
//             id: res.data.id,
//             nome: res.data.nome,
//             email: res.data.email,
//             conta: res.data.conta,
//             authority: res.data.authority,
//           }
//           await SignInCookies({
//             user: user,
//             token: res.data.token,
//           })
//           dispatch(setUser(user))
//           toast.success("Login Efetuado")
//           router.push("/dashboard")
//         })
//         .catch((err) => {
//           toast.error(err.message)
//         })
//     },
//     apiSignUp: async (data: SignUpSchemaType, setError: (path: any, info: any) => void) => {
//       // DINHUAPISignUp(data)
//       // .then(async (data) => {
//       //   if (data.errors) {
//       //     setError(data.errors[0].path[0], {
//       //       message: data.errors[0].message,
//       //     })
//       //     return
//       //   }
//       //   await SignInCookies({
//       //     user: data.data.user,
//       //     token: data.data.accessToken,
//       //   })
//       //   dispatch(setUser(data.data.user))
//       //   toast.success("Cadastro Efetuado")
//       //   router.push("/dashboard")
//       // })
//       // .catch((err) => {
//       //   toast.error(err.message)
//       // })
//     },
//     apiSignOut: async () => {
//       dispatch(signOutSuccess())
//       await SignOutCookies()
//       router.push("/")
//     },
//   }

//   return {
//     authenticated: token && signedIn,
//     signIn: apiSignIn,
//     signUp: apiSignUp,
//     signOut: apiSignOut,
//   }
// }

// export default useAuth

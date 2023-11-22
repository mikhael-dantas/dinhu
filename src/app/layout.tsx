import type { Metadata } from "next"
import "@/assets/styles/app.css"
import Providers from "@/components/Providers"
export const metadata: Metadata = {
  title: "DinhuTech",
  description: "DinhuTech",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </head>
      <body className={"bg-black"} id="root">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

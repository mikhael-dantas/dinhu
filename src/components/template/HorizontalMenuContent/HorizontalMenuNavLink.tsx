"use client"
import Link from "next/link"
import classNames from "classnames"
import type { PropsWithChildren } from "react"

export type HorizontalMenuNavLinkProps = PropsWithChildren<{
  path: string
  isExternalLink?: boolean
  className?: string
}>

const HorizontalMenuNavLink = ({ path, children, isExternalLink, className }: HorizontalMenuNavLinkProps) => {
  return (
    <Link
      className={classNames("h-full w-full flex items-center", className)}
      href={path}
      target={isExternalLink ? "_blank" : ""}
    >
      <span>{children}</span>
    </Link>
  )
}

export default HorizontalMenuNavLink

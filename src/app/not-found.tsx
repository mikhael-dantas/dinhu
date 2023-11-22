"use client"
import { useRouter } from "next/navigation"
import React from "react"

// import { Container } from './styles';

const app: React.FC = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.push("/")
  }, [])
  return <div />
}

export default app

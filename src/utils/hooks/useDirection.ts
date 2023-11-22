"use client"
import { useEffect } from "react"
import type { Direction } from "@/@types/theme"
import { RootState } from "@/context/redux/reducers"
import { useSelector, useDispatch } from "react-redux"
import { setDirection } from "@/context/redux/reducers/theme/themeSlice"

function useDirection(): [direction: Direction, updateDirection: (dir: Direction) => void] {
  const direction = useSelector((state: RootState) => state.theme.direction)

  const dispatch = useDispatch()
  const updateDirection = (dir: Direction) => {
    dispatch(setDirection(dir))
  }

  useEffect(() => {
    if (window === undefined) {
      return
    }
    const root = window.document.documentElement
    root.setAttribute("dir", direction)
  }, [direction])

  return [direction, updateDirection]
}

export default useDirection

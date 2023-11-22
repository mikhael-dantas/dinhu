"use client"
import { useEffect } from "react"
import { THEME_ENUM } from "@/constants/theme.constant"
import type { Mode } from "@/@types/theme"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"
import { setMode } from "@/context/redux/reducers/theme/themeSlice"

function useDarkMode(): [isEnabled: boolean, onModeChange: (mode: Mode) => void] {
  const mode = useSelector((state: RootState) => state.theme.mode)
  const { MODE_DARK, MODE_LIGHT } = THEME_ENUM

  const isEnabled = mode === MODE_DARK

  const dispatch = useDispatch()
  const onModeChange = (mode: Mode) => {
    dispatch(setMode(mode))
  }

  useEffect(() => {
    if (window === undefined) {
      return
    }
    const root = window.document.documentElement
    root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK)
    root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT)
  }, [isEnabled])

  return [isEnabled, onModeChange]
}

export default useDarkMode

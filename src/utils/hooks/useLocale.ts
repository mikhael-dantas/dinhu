"use client"
import { useEffect } from "react"
import i18n from "i18next"
import dayjs from "dayjs"
import { dateLocales } from "@/locales"
import { useSelector } from "react-redux"
import { RootState } from "@/context/redux/reducers"

function useLocale() {
  const locale = useSelector((state: RootState) => state.locale.currentLang)

  useEffect(() => {
    const formattedLang = locale.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase()
    })
    if (locale !== i18n.language) {
      i18n.changeLanguage(formattedLang)
    }
    dateLocales[formattedLang]().then(() => {
      dayjs.locale(formattedLang)
    })
  }, [locale])

  return locale
}

export default useLocale

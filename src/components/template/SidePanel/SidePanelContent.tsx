import type { ThemeConfiguratorProps } from "@/components/template/ThemeConfigurator"
import LayoutSwitcher from "../ThemeConfigurator/LayoutSwitcher"
import ThemeSwitcher from "../ThemeConfigurator/ThemeSwitcher"
import ModeSwitcher from "../ThemeConfigurator/ModeSwitcher"
import NavModeSwitcher from "../ThemeConfigurator/NavModeSwitcher"

export type SidePanelContentProps = ThemeConfiguratorProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SidePanelContent = (props: SidePanelContentProps) => {
  return (
    <div>
      <ThemeSwitcher />
      Dark: <ModeSwitcher />
      <NavModeSwitcher />
      <LayoutSwitcher />
    </div>
  )
}

export default SidePanelContent

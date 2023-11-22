import * as React from "react"

import { cn } from "@/utils/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>
// border-[2px] border-color2 rounded-md p-2 w-full mr-2 shadow-[0px_3px_3px_rgba(0,0,0,0.2)]

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "inputc",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

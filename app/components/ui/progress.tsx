import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "~/lib/utils"


interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  isDesktop: boolean
  mainProgress?: string | number
  backgroundProgress?: string | number
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, isDesktop, mainProgress, backgroundProgress, children, ...props }, ref) => {  
  // Determine the transform value based on the state
  const getTransformValue = (p: number | string| undefined) => {
    if (value !== undefined && typeof value === "number") {
      return `translateX(-${100 - (value || 0)}%)`
    }

    switch (p) {
      case "payments":
        return isDesktop ? "translateX(-66%)" : "translateX(calc(-140px))" // Fully empty
      case "participants":
        return isDesktop ? "translateX(-33%)" : "translateX(calc(-76px))" // 100% - 40px
      case "delegate":
        return isDesktop ? "translateX(0%)" : "translateX(0%)" // 100% full
      default:
        return "translateX(0)" // 100% - 80px (default for backward compatibility)
    }
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="absolute z-10 h-full w-full flex-1 transition-all rounded-md bg-gradient-to-br from-primary to-[#97C7F5] dark:to-[#0055A4]"
        style={{ transform: getTransformValue(mainProgress) }}
      />
      <ProgressPrimitive.Indicator
        className="absolute h-full w-full flex-1 transition-all rounded-md bg-muted"
        style={{ transform: getTransformValue(backgroundProgress) }}
      />
      {children}
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName
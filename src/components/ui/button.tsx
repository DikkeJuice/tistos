
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-105 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-navy text-white hover:bg-navy/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white",
        secondary:
          "bg-magenta text-white hover:bg-magenta/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-navy underline-offset-4 hover:underline",
        vibrant: "bg-gradient-to-r from-magenta to-coral text-white hover:from-magenta/90 hover:to-coral/90",
        sunny: "bg-gradient-to-r from-yellow to-gold text-navy hover:from-yellow/90 hover:to-gold/90",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-md px-4",
        lg: "h-14 rounded-lg px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

import * as React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Button, buttonVariants } from './ui/button'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

interface ToolTippedButtonProps
  extends VariantProps<typeof buttonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text to display in the tooltip */
  label: string
  /** Custom tooltip styling */
  tooltipClassName?: string
  /** Custom button content (like an icon) */
  children?: React.ReactNode
}

export const ToolTippedButton: React.FC<ToolTippedButtonProps> = ({
  label,
  variant = 'default',
  size = 'default',
  tooltipClassName = '',
  children,
  ...buttonProps
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant={variant} size={size} {...buttonProps}>
            {children || label}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={cn(
              'bg-uiacc text-white text-xs py-1 rounded-sm px-4 shadow-lg z-[100]',
              tooltipClassName
            )}
            side="top"
            sideOffset={5}
          >
            {label}
            <Tooltip.Arrow className="fill-uiacc" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

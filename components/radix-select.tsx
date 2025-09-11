import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RadixSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className={cn(
          'flex h-12 w-full items-center justify-between rounded border border-gray-300 dark:border-gray-800 bg-white dark:bg-slate-800 px-3 text-sm',
          !value && 'text-gray-500 dark:text-gray-400'
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="z-50 mt-2 w-full overflow-hidden rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-lg"
          position="popper"
        >
          <Select.Viewport className="p-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className={cn(
                  'relative flex cursor-pointer select-none items-center rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700',
                  'data-[state=checked]:bg-uiacc/10 data-[state=checked]:text-uiacc'
                )}
              >
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-3">
                  <Check className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

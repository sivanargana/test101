import * as React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Option = {
  name: string
  id: number
}

interface MultiSelectProps {
  name: string
  options: Option[] | undefined
  placeholder?: string
}

export function MultiSelect({ name, options, placeholder = "Select options" }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => {
        // value is array of selected IDs
        const selectedIds = value as number[]

        // get selected options by filtering from all options
        const selectedOptions = options?.filter((option) =>
          selectedIds.includes(option.id)
        ) || []

        const toggleOption = (option: Option) => {
          if (selectedIds.includes(option.id)) {
            // remove ID
            onChange(selectedIds.filter((id) => id !== option.id))
          } else {
            // add ID
            onChange([...selectedIds, option.id])
          }
        }

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between"
              >
                {selectedOptions.length > 0
                  ? selectedOptions.map((s) => s.name).join(", ")
                  : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandGroup>
                  {options?.map((option) => (
                    <CommandItem
                      key={option.id}
                      onSelect={() => toggleOption(option)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          selectedIds.includes(option.id) &&
                            "bg-primary text-primary-foreground"
                        )}
                      >
                        {selectedIds.includes(option.id) && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                      {option.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )
      }}
    />
  )
}

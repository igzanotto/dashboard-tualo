"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const months = [
    { value: "january", label: "Enero" },
    { value: "february", label: "Febrero" },
    { value: "march", label: "Marzo" },
    { value: "april", label: "Abril" },
    { value: "may", label: "Mayo" },
    { value: "june", label: "Junio" },
    { value: "july", label: "Julio" },
    { value: "august", label: "Agosto" },
    { value: "september", label: "Septiembre" },
    { value: "october", label: "Octubre" },
    { value: "november", label: "Noviembre" },
    { value: "december", label: "Diciembre" },
];

function getLastDateOfMonth(monthIndex: number): Date {
    const year = new Date().getFullYear();
    return new Date(year, monthIndex + 1, 0);
}

interface SelectClosingMonthProps {
    onSelect: (date: Date | null) => void;
}

export default function SelectClosingMonth({ onSelect }: SelectClosingMonthProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>("")
  const [dateValue, setDateValue] = React.useState<Date | null>(null)

  const handleSelect = (currentValue: string) => {
    if (currentValue === value) {
        setValue("")
        setDateValue(null)
        onSelect(null) // Call onSelect with null when no month is selected
    } else {
        const monthIndex = months.findIndex(month => month.value === currentValue)
        const lastDate = getLastDateOfMonth(monthIndex)
        setValue(currentValue)
        setDateValue(lastDate)
        onSelect(lastDate) // Call onSelect with the Date object
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? months.find((month) => month.value === value)?.label
            : "Selecciona un mes"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Buscar mes" />
          <CommandList>
            <CommandEmpty>No se encuentra este mes.</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {months.map((month) => (
                <CommandItem
                  key={month.value}
                  value={month.value}
                  onSelect={() => handleSelect(month.value)}
                  className="flex items-center gap-2"
                >
                  {month.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <input type="hidden" name="closing_month" value={dateValue?.toISOString().split('T')[0]} />
    </Popover>
  )
}

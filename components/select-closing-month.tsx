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
    {
        value: "january",
        label: "Enero",
    },
    {
        value: "february",
        label: "Febrero",
    },
    {
        value: "march",
        label: "Marzo",
    },
    {
        value: "april",
        label: "Abril",
    },
    {
        value: "may",
        label: "Mayo",
    },
    {
        value: "june",
        label: "Junio",
    },
    {
        value: "july",
        label: "Julio",
    },
    {
        value: "august",
        label: "Agosto",
    },
    {
        value: "september",
        label: "Septiembre",
    },
    {
        value: "october",
        label: "Octubre",
    },
    {
        value: "november",
        label: "Noviembre",
    },
    {
        value: "december",
        label: "Diciembre",
    },
];


export default function SelectClosingMonth({ onSelect }:any) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")


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
            ? months.find((bank) => bank.value === value)?.label
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
              {months.map((bank) => (
                <CommandItem
                  key={bank.value}
                  value={bank.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    }}
                  className="flex items-center gap-2"
                >
                  {bank.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <input type="hidden" name="closing_month" value={value} />
    </Popover>
  )
}

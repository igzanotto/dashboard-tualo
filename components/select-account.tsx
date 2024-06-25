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

const accounts = [
    {
      value: "credit",
      label: "Crédito",
    },
    {
      value: "debit",
      label: "Débito",
    },
    
  ]

export default function SelectAccount({ onSelect, defaultValue  }:any) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue || "");


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
            ? accounts.find((bank) => bank.value === value)?.label || value
            : "Selecciona un tipo de cuenta"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          {/* <CommandInput placeholder="Buscar cuenta" /> */}
          <CommandList>
            {/* <CommandEmpty>No se encuentra este tipo de cuenta.</CommandEmpty> */}
            <CommandGroup className="overflow-y-scroll">
              {accounts.map((bank) => (
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
      <input type="hidden" name="type" value={value} />
    </Popover>
  )
}

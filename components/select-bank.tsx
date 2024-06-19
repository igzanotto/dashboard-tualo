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
import BbbvaIcon from "./icons/BbbvaIcon"
import BanamexIcon from "./icons/BanamexIcon"
import BanorteIcon from "./icons/BanorteIcon"
import SantanderIcon from "./icons/SantanderIcon"
import ScotiaIcon from "./icons/ScotiaIcon"
import HsbcIcon from "./icons/HsbcIcon"
import IbursaIcon from "./icons/IbursaIcon"
import BajioIcon from "./icons/BajioIcon"
import AfirmeIcon from "./icons/AfirmeIcon"
import AztecaIcon from "./icons/AztecaIcon"

const frameworks = [
  {
    value: "bbva",
    label: "BBVA Bancomer",
    icon:<BbbvaIcon/>
  },
  {
    value: "banamex",
    label: "Banamex",
    icon:<BanamexIcon/>
  },
  {
    value: "banorte",
    label: "Banorte",
    icon:<BanorteIcon/>
  },
  {
    value: "santander",
    label: "Santander Río",
    icon:<SantanderIcon/>
  },
  {
    value: "scotia",
    label: "Scotia",
    icon:<ScotiaIcon/>
  },
  {
    value: "hsbc",
    label: "HSBC",
    icon:<HsbcIcon/>
  },
  {
    value: "inbursa",
    label: "Inbursa",
    icon:<IbursaIcon/>
  },
  {
    value: "bajio",
    label: "Bajío",
    icon:<BajioIcon/>
  },
  {
    value: "afirme",
    label: "Afirme",
    icon:<AfirmeIcon/>
  },
  {
    value: "azteca",
    label: "Azteca",
    icon:<AztecaIcon/>
  },
]

export default function SelectBank({ onSelect }:any) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = (currentValue:string) => {
    const selectedFramework = frameworks.find((framework) => framework.value === currentValue)
    const newValue = selectedFramework ? selectedFramework.label : ""
    setValue(newValue)
    setOpen(false)
    onSelect(newValue) // Llamar la función onSelect con el nombre del banco seleccionado
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
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Selecciona un banco"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Buscar banco" />
          <CommandList>
            <CommandEmpty>No se encuentra este banco.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    }}
                  className="flex items-center gap-2"
                >
                  {framework.icon}
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <input type="hidden" name="name" value={value} />
    </Popover>
  )
}

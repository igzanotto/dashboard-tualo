import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BbbvaIcon from "./icons/BbbvaIcon";
import BanamexIcon from "./icons/BanamexIcon";
import BanorteIcon from "./icons/BanorteIcon";
import SantanderIcon from "./icons/SantanderIcon";
import ScotiaIcon from "./icons/ScotiaIcon";
import HsbcIcon from "./icons/HsbcIcon";
import IbursaIcon from "./icons/IbursaIcon";
import BajioIcon from "./icons/BajioIcon";
import AfirmeIcon from "./icons/AfirmeIcon";
import AztecaIcon from "./icons/AztecaIcon";
import AlboIcon from "./icons/AlboIcon";
import AmexIcon from "./icons/AmexIcon";
import BanRegioIcon from "./icons/BanRegioIcon";
import BroxelIcon from "./icons/BroxelIcon";
import BxIcon from "./icons/BxIcon";
import ClaraIcon from "./icons/ClaraIcon";
import FondeadoraIcon from "./icons/FondeadoraIcon";
import HeyBancoIcon from "./icons/HeyBancoIcon";
import IntercamIcon from "./icons/IntercamIcon";
import RappiIcon from "./icons/RappiIcon";

const banks = [
  {
    value: "afirme",
    label: "Afirme",
    icon: <AfirmeIcon />,
  },
  {
    value: "albo",
    label: "Albo",
    icon: <AlboIcon />,
  },
  {
    value: "amex",
    label: "Amex",
    icon: <AmexIcon />,
  },
  {
    value: "azteca",
    label: "Azteca",
    icon: <AztecaIcon />,
  },
  {
    value: "BanBajío",
    label: "BanBajío",
    icon: <BajioIcon />,
  },
  {
    value: "banamex",
    label: "Banamex",
    icon: <BanamexIcon />,
  },
  {
    value: "banorte",
    label: "Banorte",
    icon: <BanorteIcon />,
  },
  {
    value: "BanRegio",
    label: "BanRegio",
    icon: <BanRegioIcon />,
  },
  {
    value: "BBVA bancomer",
    label: "BBVA Bancomer",
    icon: <BbbvaIcon />,
  },
  {
    value: "broxel",
    label: "Broxel",
    icon: <BroxelIcon />,
  },
  {
    value: "bx+",
    label: "BX+",
    icon: <BxIcon />,
  },
  {
    value: "clara",
    label: "Clara",
    icon: <ClaraIcon />,
  },
  {
    value: "fondeadora",
    label: "Fondeadora",
    icon: <FondeadoraIcon />,
  },
  {
    value: "hey banco",
    label: "Hey Banco",
    icon: <HeyBancoIcon />,
  },
  {
    value: "HSBC",
    label: "HSBC",
    icon: <HsbcIcon />,
  },
  {
    value: "inbursa",
    label: "Inbursa",
    icon: <IbursaIcon />,
  },
  {
    value: "intercam",
    label: "Intercam",
    icon: <IntercamIcon />,
  },
  {
    value: "rappi",
    label: "Rappi",
    icon: <RappiIcon />,
  },
  {
    value: "santander",
    label: "Santander",
    icon: <SantanderIcon />,
  },
  {
    value: "scotia",
    label: "Scotia Bank",
    icon: <ScotiaIcon />,
  },
];

export default function SelectBank({ onSelect, defaultValue }: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue || "");
  const [customBank, setCustomBank] = React.useState("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    setCustomBank(""); // Clear custom bank input if selecting from the list
  };

  const handleCustomBankSelect = () => {
    if (customBank.trim() !== "") {
      setValue(customBank);
      setOpen(false);
    }
  };

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
            ? banks.find((bank) => bank.value === value)?.label || value
            : "Selecciona un banco"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Buscar banco" />
          <CommandList>
            <CommandEmpty>No se encuentra este banco.</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              <CommandItem className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Otro..."
                  value={customBank}
                  onChange={(e) => setCustomBank(e.target.value)}
                  onBlur={handleCustomBankSelect}
                  className="border p-2 w-full rounded-lg"
                />
              </CommandItem>
              {banks.map((bank) => (
                <CommandItem
                  key={bank.value}
                  value={bank.value}
                  onSelect={() => handleSelect(bank.value)}
                  className="flex items-center gap-2"
                >
                  {bank.icon}
                  {bank.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <input type="hidden" name="name" value={value} />
    </Popover>
  );
}

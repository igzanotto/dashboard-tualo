import React, { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const months = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

interface SelectMonthMovementsToRevisionProps {
  onSelect: (month: number) => void;
  defaultMonth?: number;
}

const SelectMonthMovementsToRevision: React.FC<SelectMonthMovementsToRevisionProps> = ({
  onSelect,
  defaultMonth = new Date().getMonth() + 1,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  const handleSelect = (month: number) => {
    setSelectedMonth(month);
    onSelect(month);
    setOpen(false);
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
          {selectedMonth
            ? months.find((month) => month.value === selectedMonth)?.label || selectedMonth
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
                  value={month.value.toString()}
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
    </Popover>
  );
};

export default SelectMonthMovementsToRevision;

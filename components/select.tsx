"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { ReactNode } from 'react';
  
  interface Props {
    value: string;
    placeholder: string;
    name?: string;
  }
  
  const SelectComponent = ({ value, placeholder, name }: Props) => {
    return (
      <Select name={name} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          
        </SelectContent>
      </Select>
    );
  };
  
  export default SelectComponent;
  

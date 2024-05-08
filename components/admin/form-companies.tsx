"use client"

import { create } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";


export default async function AddCompanyForm() {

  const formRef = useRef<HTMLFormElement>(null)


  return (
    <form 
      ref={formRef}
      action={
      async formData => {const company = await create(formData);
        console.log("Company added successfully", company);
        toast.success("Negocio agregado correctamente");
        formRef.current?.reset();
        redirect("/pages/admin/negocios")
      }
      
      } 
      className='flex flex-col gap-4 w-[100%]'
      >
      <input type="text" name="company" placeholder='Nombre del negocio' className='rounded-xl bg-slate-100 px-2'/>
      <button type="submit" className='p-3 rounded-xl bg-blue-500 text-white'>Agregar negocio</button>
    </form>
  );
}

import { createCompany } from "@/app/lib/actions";

export default async function AddCompanyForm() {

  return (
    <form action={createCompany}
      className='flex flex-col gap-4 w-[100%]'
      >
      <input type="text" name="name" placeholder='Nombre del negocio' className='rounded-xl bg-slate-100 px-2'/>
      <input type="text" name="description" placeholder='Descripción del negocio' className='rounded-xl bg-slate-100 px-2'/>
      <button type="submit" className='p-3 rounded-xl bg-blue-500 text-white'>Agregar negocio</button>
    </form>
  );
}

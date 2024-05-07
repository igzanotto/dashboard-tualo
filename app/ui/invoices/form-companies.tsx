import { addCompany } from '@/app/lib/data';

export default function AddCompanyForm() {
  async function create(formData:FormData) {
    'use server';
    try {
      const company = formData.get("company")
      await addCompany(company as string);
      console.log('Company added successfully!', company);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form action={create} className='flex flex-col gap-4 w-[100%]'>
      <input type="text" name="company" placeholder='Nombre del negocio' className='rounded-xl bg-slate-100 px-2'/>
      <button type="submit" className='p-3 rounded-xl bg-blue-500 text-white'>Agregar negocio</button>
    </form>
  );
}

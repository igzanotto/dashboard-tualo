import { addCompany } from '@/app/lib/data';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';


export default function AddCompanyForm() {
 

  async function create(formData:FormData) {
    'use server';
    try {
      const company = formData.get("company")
      await addCompany(company as string);
      console.log('Company added successfully!');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form action={create}>
      <input type="text" name="company" />
      <button type="submit">Agregar negocio</button>
    </form>
  );
}

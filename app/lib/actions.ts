'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function createCompany(formData: FormData) {

  const name = formData.get('name');
  const description = formData.get('description');
  const supabase = createClient();

  const { data: companies, error } = await supabase.from('companies').insert({ name, description });

  if (error) {
    throw error;
  }

  // clear this cache and trigger a new request to the server for the path to see the new company
  revalidatePath('/pages/admin/buisnesses');

  redirect('/pages/admin/buisnesses');
}

export async function createReport(formData:FormData) {
  
}

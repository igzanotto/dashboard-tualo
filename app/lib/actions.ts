'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;

    // clear this cache and trigger a new request to the server for the path to see the new invoice
    revalidatePath('/dashboard/negocios');

    redirect('/dashboard/negocios');
}


export async function addCompany(name:string) {
  const supabase = createClient();
  try {
    const { data:companies, error } = await supabase.from('companies').insert({ name });

    if (error) {
      throw error;
    }
    
    console.log('company created:', companies);
    return companies;
  } catch (error) {
    console.error('Failed to add company:', error);
    throw new Error('Failed to add company.');
  }
}

export async function create (formData:FormData) {
  try {
    const company = formData.get("company")
    await addCompany(company as string);
    console.log('Company added successfully!', company);
  } catch (error) {
    console.log(error);
  }
}

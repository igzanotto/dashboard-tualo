'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const CompanyFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

const CreateCompany = CompanyFormSchema.omit({ id: true });

export async function createCompany(formData: FormData) {
  const { name, description } = CreateCompany.parse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  const supabase = createClient();

  const { data: companies, error } = await supabase.from('companies').insert({ name, description });

  if (error) {
    throw error;
  }

  // clear this cache and trigger a new request to the server for the path to see the new company
  revalidatePath('/admin/buisnesses');

  redirect('/admin/buisnesses');
}


const ReportFormSchema = z.object({
  id: z.string(),
  month: z.string(),
  company_resume: z.string(),
  company_id: z.string(),
  goals: z.string(),
  analysis: z.string(),
});

const CreateReport = ReportFormSchema.omit({ id: true });

export async function createReport(formData:FormData) {
  const { month, company_resume, company_id, goals, analysis } = CreateReport.parse({
    month: formData.get('month'),
    company_resume: formData.get('company_resume'),
    company_id: formData.get('company_id'),
    goals: formData.get('goals'),
    analysis: formData.get('analysis'),
  });
  console.log(month, company_resume, company_id, goals, analysis);

  const supabase = createClient();

  const { data: reports, error } = await supabase.from('reports').insert({ month, company_resume, company_id, goals, analysis });

  if (error) {
    console.log("error");
    throw error;
  }

  // clear this cache and trigger a new request to the server for the path to see the new report
  revalidatePath('/admin/reports');

  redirect('/admin/reports');
}

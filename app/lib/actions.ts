'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const BuisnessFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

const CreateBuisness = BuisnessFormSchema.omit({ id: true });

export async function createBuisness(formData: FormData) {
  const { name, description } = CreateBuisness.parse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  const supabase = createClient();

  const { data: buisnesses, error } = await supabase.from('buisnesses').insert({ name, description });

  if (error) {
    throw error;
  }

  // clear this cache and trigger a new request to the server for the path to see the new buisness
  revalidatePath('/admin/buisnesses');

  redirect('/admin/buisnesses');
}


const ReportFormSchema = z.object({
  id: z.string(),
  month: z.string(),
  buisness_resume: z.string(),
  buisness_id: z.string(),
  goals: z.string(),
  analysis: z.string(),
});

const CreateReport = ReportFormSchema.omit({ id: true });

export async function createReport(formData:FormData) {
  const { month, buisness_resume, buisness_id, goals, analysis } = CreateReport.parse({
    month: formData.get('month'),
    buisness_resume: formData.get('buisness_resume'),
    buisness_id: formData.get('buisness_id'),
    goals: formData.get('goals'),
    analysis: formData.get('analysis'),
  });
  console.log(month, buisness_resume, buisness_id, goals, analysis);

  const supabase = createClient();

  const { data: reports, error } = await supabase.from('reports').insert({ month, buisness_resume, buisness_id, goals, analysis });

  if (error) {
    console.log("error");
    throw error;
  }

  // clear this cache and trigger a new request to the server for the path to see the new report
  revalidatePath('/admin/reports');

  redirect('/admin/reports');
}


export async function searchBusiness(formData:FormData){

}
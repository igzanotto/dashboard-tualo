'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const BusinessFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

const CreateBusiness = BusinessFormSchema.omit({ id: true });

export async function createBusiness(formData: FormData) {
  const { name, description } = CreateBusiness.parse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  const supabase = createClient();

  const { data: businesses, error } = await supabase.from('businesses').insert({ name, description });

  if (error) {
    throw error;
  }

  // clear this cache and trigger a new request to the server for the path to see the new business
  revalidatePath('/admin/businesses');

  redirect('/admin/businesses');
}


const ReportFormSchema = z.object({
  id: z.string(),
  month: z.string(),
  business_resume: z.string(),
  business_id: z.string(),
  goals: z.string(),
  analysis: z.string(),
});

const CreateReport = ReportFormSchema.omit({ id: true, goals: true, analysis: true});

export async function createReport(formData:FormData) {
  console.log("adentro de createReport")
  console.log(formData);
  const { month, business_resume, business_id } = CreateReport.parse({
    month: formData.get('month'),
    business_resume: formData.get('business_resume'),
    business_id: formData.get('business_id'),
  });
  console.log(month, business_resume, business_id);

  const supabase = createClient();

  const { data: reports, error } = await supabase.from('reports').insert({ month, business_resume, business_id });

  if (error) {
    console.log("error");
    throw error;
  }

  
  // clear this cache and trigger a new request to the server for the path to see the new report
  revalidatePath(`/admin/businesses/${business_id}`);

  redirect(`/admin/businesses/${business_id}`);
}


const ChartFormSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  insights: z.string(),
  report_id: z.string(),
});

const CreateChart = ChartFormSchema.omit({ id: true });

export async function createChart(formData:FormData) {
  const { type, description, insights, report_id } = CreateChart.parse({
    month: formData.get('month'),
    business_resume: formData.get('business_resume'),
    Risness_id: formData.get('business_id'),
    goals: formData.get('goals'),
    analysis: formData.get('analysis'),
  });
  console.log(type, description, insights, report_id);

  const supabase = createClient();

  const { data: chart, error } = await supabase.from('reports').insert({ type, description, insights, report_id });

  if (error) {
    console.log("error");
    throw error;
  }
  console.log(chart);
  
  // clear this cache and trigger a new request to the server for the path to see the new report
  revalidatePath('/dashbord/reports');

  redirect('/dashbord/reports');
}

export async function searchBusiness(formData:FormData){

}
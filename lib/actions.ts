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
  console.log("data enviada ",month, business_resume, business_id);

  const supabase = createClient();

  const { data, error } = await supabase
    .from('reports')
    .insert([
      { month: month, business_resume: business_resume, business_id: business_id }
    ])
    .select('id');

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log("ID de la fila insertada:", data);
  }

  if (!data) {
    return;
  }

  const report_id = data[0].id;

  redirect(`/admin/businesses/${business_id}/reports/${report_id}/goals`);
}

const BuildGoalsReport = ReportFormSchema.omit({ month: true, business_id: true, analysis: true, business_resume: true });

export async function buildGoalsReport(formData:FormData) {
  console.log("adentro de createReport")
  console.log(formData);
  const { id , goals } = BuildGoalsReport.parse({
    id: formData.get('report_id'),
    goals: formData.get('goals'),
  });

  const supabase = createClient();

  const { data, error } = await supabase
    .from('reports')
    .update({ goals: goals })
    .eq('id', id)
    .select('id, business_id');


  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log("ID de la fila insertada:", data);
  }

  if (!data) {
    return;
  }

  const report_id = data[0].id;
  const business_id = data[0].business_id;

  redirect(`/admin/businesses/${business_id}/reports/${report_id}/PL`);
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

export async function addThreadToBusiness(thread_id: string, business_id: string) {
  const supabase = createClient();

  console.log("thread_id", thread_id);
  console.log("business_id", business_id);

  const { data, error } = await supabase
    .from('businesses')
    .update({ thread_id: thread_id })
    .eq('id', business_id);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log("thread guardado en negocio");
  }
}

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


interface ChartData {
  name: string;
  data: number[];
}

interface ChartDataPayload {
  series: ChartData[];
  categories: string[];
}
export async function createStackedChart(data: ChartDataPayload){
  const supabase = createClient();
  try {
    const { data: chartData, error } = await supabase.from('chart_data').insert([
      { series: JSON.stringify(data.series), categories: JSON.stringify(data.categories) }
    ]);

    if (error) {
      throw error;
    }

    console.log('Datos del gráfico guardados correctamente:', chartData);
    console.log("Data",data);
    
    return chartData;
  } catch (error) {
    console.error('Error al guardar los datos del gráfico:', error);
    throw error;
  }
}


const ChartEmbedFormSchema = z.object({
  type: z.string(),
  report_id: z.string(),
  graphy_url: z.string(),
});

export async function createChartEmbed(formData:FormData){
  const parsedData = ChartEmbedFormSchema.safeParse({
    type: formData.get('type'),
    report_id: formData.get('report_id'),
    graphy_url: formData.get('graphy_url'),
  });

  
  if (!parsedData.success) {
    console.error('Validation Error:', parsedData.error);
    throw new Error('Invalid form data');
  }

  const { type, report_id, graphy_url} = parsedData.data;

  console.log('Parsed Data:', { type, report_id, graphy_url});

  const supabase = createClient();
  try {
    // Verificar si ya existe una fila para el tipo de gráfico seleccionado
    const { data: existingCharts, error: fetchError } = await supabase
      .from('charts')
      .select()
      .eq('type', type)
      .eq('report_id', report_id)
      .limit(1);

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      throw fetchError;
    }

    if (existingCharts.length > 0) {
      
      const existingChart = existingCharts[0];
      const { data: updatedChart, error: updateError } = await supabase
        .from('charts')
        .update({ graphy_url })
        .eq('id', existingChart.id)
        .single();

      if (updateError) {
        console.error('Supabase update error:', updateError);
        throw updateError;
      }

      console.log('Updated chart data:', updatedChart);
      return updatedChart;
    } else {
      // Si no existe, crear una nueva fila con el graphy_url
      const { data: newChart, error: insertError } = await supabase
        .from('charts')
        .insert([{ type, report_id, graphy_url }]);

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw insertError;
      }

      console.log('Inserted chart data:', newChart);
      return newChart;
    }
  } catch (error) {
    console.error('Error creating or updating chart:', error);
    throw error;
  }
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
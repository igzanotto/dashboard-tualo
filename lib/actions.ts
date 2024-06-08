'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';
import { createAdmin } from '@/utils/supabase/admin';

const BusinessFormSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const CreateBusiness = BusinessFormSchema.omit({ id: true });

export async function createBusiness(formData: FormData) {
  const { name } = CreateBusiness.parse({
    name: formData.get('name')
  });

  const supabase = createClient();

  const { data: response, error } = await supabase
  .from('businesses')
  .insert({ name })
  .select('id')
  .single();


  if (error) {
    throw error;
  }

  console.log('Business created:', response.id);
  // clear this cache and trigger a new request to the server for the path to see the new business
  revalidatePath(`/admin/businesses/${response.id}/users/add`);

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

const BuildGoals = ReportFormSchema.omit({ month: true, business_id: true, analysis: true, business_resume: true });

export async function buildGoals(formData:FormData) {
  console.log("adentro de createReport")
  console.log(formData);
  const { id , goals } = BuildGoals.parse({
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

  const report_id = id
  const business_id = data[0].business_id;

  redirect(`/admin/businesses/${business_id}/reports/${report_id}/PL`);
}


const BuildAnalysis = ReportFormSchema.omit({id: true, business_id: true, goals: true, month: true, business_resume: true});

export async function buildAnalysis(formData:FormData) {
  const report_id = formData.get('report_id');
  const business_id = formData.get('business_id');
  const report_type = formData.get('report_type');

  const { analysis } = BuildAnalysis.parse({
    analysis: formData.get('analysis'),
  });

  const supabase = createClient();

  const { data, error } = await supabase
    .from('reports')
    .update({ analysis: analysis })
    .eq('id', report_id)

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log("analisis creado correctamente");
  }

  report_type === "followup" ? 
  redirect(`/admin/businesses/${business_id}/reports/${report_id}/followup-recomendations`) :
  redirect(`/admin/businesses/${business_id}/reports/${report_id}/recomendations`);
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
  revalidatePath('/dashboard/reports');

  redirect('/dashboard/reports');
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
  business_id: z.string(),
});

export async function createChartEmbed(formData:FormData){
  const parsedData = ChartEmbedFormSchema.safeParse({
    type: formData.get('type'),
    report_id: formData.get('report_id'),
    graphy_url: formData.get('graphy_url'),
    business_id: formData.get('business_id')
  });

  
  if (!parsedData.success) {
    console.error('Validation Error:', parsedData.error);
    throw new Error('Invalid form data');
  }

  const { type, report_id, graphy_url, business_id} = parsedData.data;

  console.log('Parsed Data:', { type, report_id, graphy_url, business_id});

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
        revalidatePath(`/admin/businesses/${business_id}/reports/${report_id}`)
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
    console.log("thread guardado en business correctamente");
  }
}


const ChartsFormSchema = z.object({
  id: z.string(),
  waterfall_chart_insights: z.string().optional(),
  sales_chart_insights: z.string().optional(),
  costs_and_expenses_chart_insights: z.string().optional(),
  net_profit_and_margins_chart_insights: z.string().optional(),
  margins_chart_insights: z.string().optional(),
  detailed_expenses_chart_insights: z.string().optional(),
  actual_vs_average_chart_insights: z.string().optional(),
  actual_vs_average_2_chart_insights: z.string().optional(),
  report_id: z.string(),
  business_id: z.string(),
});

const BuildChartsInsights = ChartsFormSchema.omit({id: true, business_id: true, report_id: true});

export async function buildChartsInsights(formData:FormData) {
  console.log("adentro de charts builder")
  console.log(formData);
  const report_id = formData.get('report_id');
  const business_id = formData.get('business_id');
  const report_type = formData.get('report_type');

  if (report_type === "followup") {
    const {
        waterfall_chart_insights,
        actual_vs_average_chart_insights,
        actual_vs_average_2_chart_insights,
    } = BuildChartsInsights.parse({
      waterfall_chart_insights: formData.get('waterfall_chart_insights'),
      actual_vs_average_chart_insights: formData.get('actual_vs_average_chart_insights'),
      actual_vs_average_2_chart_insights: formData.get('actual_vs_average_2_chart_insights'),

    })

    const supabase = createClient();

    const { data, error } = await supabase
      .from('charts')
      .insert([
        { type: "waterfall", insights: waterfall_chart_insights, report_id: report_id },
        { type: "actual_vs_average", insights: actual_vs_average_chart_insights, report_id: report_id },
        { type: "actual_vs_average_2", insights: actual_vs_average_2_chart_insights, report_id: report_id },
      ])

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log("graficos generados correctamente");
      }
  
    
    redirect(`/admin/businesses/${business_id}/reports/${report_id}/followup-history-charts`)
 
    
  } else if (report_type === "followup-history") {
    const {
        sales_chart_insights, 
        costs_and_expenses_chart_insights, 
        net_profit_and_margins_chart_insights, 
        margins_chart_insights,
        detailed_expenses_chart_insights,
      } = BuildChartsInsights.parse({
        sales_chart_insights: formData.get('sales_chart_insights'),
        costs_and_expenses_chart_insights: formData.get('costs_and_expenses_chart_insights'),
        net_profit_and_margins_chart_insights: formData.get('net_profit_and_margins_chart_insights'),
        margins_chart_insights: formData.get('margins_chart_insights'),
        detailed_expenses_chart_insights: formData.get('detailed_expenses_chart_insights'),
    
      })

      const supabase = createClient();

    const { data, error } = await supabase
      .from('charts')
      .insert([
        { type: "sales", insights: sales_chart_insights, report_id: report_id },
        { type: "costs_and_expenses", insights: costs_and_expenses_chart_insights, report_id: report_id },
        { type: "net_profit_and_margins", insights: net_profit_and_margins_chart_insights, report_id: report_id },
        { type: "margins", insights: margins_chart_insights, report_id: report_id },
        { type: "detailed_expenses", insights: detailed_expenses_chart_insights, report_id: report_id },
      ])
      
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log("graficos generados correctamente");
      }
    
      redirect(`/admin/businesses/${business_id}/reports/${report_id}/followup-analysis`) 

  } else {
    const {
      waterfall_chart_insights,
      sales_chart_insights, 
      costs_and_expenses_chart_insights, 
      net_profit_and_margins_chart_insights, 
      margins_chart_insights,
      detailed_expenses_chart_insights,
    } = BuildChartsInsights.parse({
      waterfall_chart_insights: formData.get('waterfall_chart_insights'),
      sales_chart_insights: formData.get('sales_chart_insights'),
      costs_and_expenses_chart_insights: formData.get('costs_and_expenses_chart_insights'),
      net_profit_and_margins_chart_insights: formData.get('net_profit_and_margins_chart_insights'),
      margins_chart_insights: formData.get('margins_chart_insights'),
      detailed_expenses_chart_insights: formData.get('detailed_expenses_chart_insights'),
    });

    const supabase = createClient();

    const { data, error } = await supabase
      .from('charts')
      .insert([
        { type: "waterfall", insights: waterfall_chart_insights, report_id: report_id },
        { type: "sales", insights: sales_chart_insights, report_id: report_id },
        { type: "costs_and_expenses", insights: costs_and_expenses_chart_insights, report_id: report_id },
        { type: "net_profit_and_margins", insights: net_profit_and_margins_chart_insights, report_id: report_id },
        { type: "margins", insights: margins_chart_insights, report_id: report_id },
        { type: "detailed_expenses", insights: detailed_expenses_chart_insights, report_id: report_id },
      ])
      
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log("graficos generados correctamente");
      }
    
      redirect(`/admin/businesses/${business_id}/reports/${report_id}/analysis`) ;
  }
}

const RecomendationsFormSchema = z.object({
  report_id: z.string(),
  business_id: z.string(),
  first_recomendation: z.string(),
  second_recomendation: z.string(),
  third_recomendation: z.string(),
  fourth_recomendation: z.string().optional(),
  fifth_recomendation: z.string().optional(),
});

const BuildRecomendations = RecomendationsFormSchema.omit({id: true, business_id: true, report_id: true});

export async function buildRecomendations(formData:FormData) {
  console.log("adentro de recomendations builder")
  console.log(formData);
  const report_id = formData.get('report_id');
  const business_id = formData.get('business_id');
  const report_type = formData.get('report_type');

  const {
    first_recomendation,
    second_recomendation, 
    third_recomendation, 
    fourth_recomendation, 
    fifth_recomendation
  } = BuildRecomendations.parse({
    first_recomendation: formData.get('first_recomendation'),
    second_recomendation: formData.get('second_recomendation'),
    third_recomendation: formData.get('third_recomendation'),
    fourth_recomendation: formData.get('fourth_recomendation'),
    fifth_recomendation: formData.get('fifth_recomendation'),
  });

  const recommendations = [
    { content: first_recomendation, report_id: report_id },
    { content: second_recomendation, report_id: report_id },
    { content: third_recomendation, report_id: report_id },
    { content: fourth_recomendation, report_id: report_id },
    { content: fifth_recomendation, report_id: report_id },
  ];

  // Filter out empty recommendations
  const nonEmptyRecommendations = recommendations.filter(rec => rec.content);

  const supabase = createClient();

  const { data, error } = await supabase
    .from('recomendations')
    .insert(nonEmptyRecommendations)

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log("recomendaciones generadas correctamente");
  }

  
  report_type === "followup" ? 
  redirect(`/admin/businesses/${business_id}/reports/${report_id}/followup-charts`) :
  redirect(`/admin/businesses/${business_id}`);
}

const ReportUpdateSchema = z.object({
  report_id: z.string(),
  business_resume: z.string().optional(),
  operations_resume: z.string().optional(),
  goals: z.string().optional(),
  analysis: z.string().optional(),
});

// Función para actualizar el reporte en Supabase
export async function updateReport(formData: FormData) {
  const updateData: any = {
    report_id: formData.get('report_id'),
  };

  const business_resume = formData.get('business_resume');
  const operations_resume = formData.get('operations_resume')
  const goals = formData.get('goals');
  const analysis = formData.get('analysis');

  if (business_resume !== null) updateData.business_resume = business_resume;
  if (operations_resume !== null) updateData.operations_resume = operations_resume;
  if (goals !== null) updateData.goals = goals;
  if (analysis !== null) updateData.analysis = analysis;

  const parsedData = ReportUpdateSchema.safeParse(updateData);

  if (!parsedData.success) {
    console.error('Validation Error:', parsedData.error);
    throw new Error('Invalid form data');
  }

  const { report_id, business_resume: br, operations_resume: op, goals: gl, analysis: an } = parsedData.data;
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('reports')
      .update({
        ...(br !== undefined && { business_resume: br }),
        ...(op !== undefined && { operations_resume: op }),
        ...(gl !== undefined && { goals: gl }),
        ...(an !== undefined && { analysis: an })
      })
      .eq('id', report_id)
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error updating report:', error);
    throw error;
  }
}

const RecomendationsUpdateSchema = z.object({
  report_id: z.string(),
  content: z.string()
});

export async function updateReportRecommendations(formData:FormData) {
  const parsedData = RecomendationsUpdateSchema.safeParse({
    report_id: formData.get('report_id'),
    content: formData.get('content')
  })

  if (!parsedData.success) {
    console.error('Validation Error:', parsedData.error);
    throw new Error('Invalid form data');
  }

  const { report_id, content} = parsedData.data;
  const supabase = createClient(); // Crear cliente Supabase
  
  try {
    const { data: recommendations, error } = await supabase
      .from('recomendations')
      .update({content})
      .eq('id', report_id)
      .single();

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      console.log(recommendations);
      
      return recommendations;
  } catch (error) {
    console.error('Error updating report recommendations:', error);
    throw error;
  }
}

export const createUser = async (users: any[], business_id: string) => {
  const supabase = createAdmin();
  
  // Filter users with non-empty emails
  const validUsers = users.filter(user => user.email.trim() !== '');
  
  for (const user of validUsers) {
    try {
      const { data: userData, error: userError } = await supabase.auth.admin.inviteUserByEmail(user.email);

      if (userError) {
        console.error(`Error creating user ${user.email}:`, userError);
        continue; // Skip to the next user
      }

      console.log(`User invited: ${userData.user.email}`);
      
      // Adding the profile with name and business_id
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({ name: user.name, business_id: business_id })
        .eq('id', userData.user.id)
        .single();

      if (profileError) {
        console.error(`Error creating profile for ${user.email}:`, profileError);
        throw profileError;
      } 

      console.log(`Profile created for ${profileData}`);
      console.log(`User ${user.email} added to business ${business_id}`);
      
    } catch (err) {
      console.error(`Unexpected error for user ${user.email}:`, err);
    }
  }

  // Redirect after processing all users
  redirect('/admin/businesses');
};



const FollowupReportFormSchema = z.object({
  id: z.string(),
  business_id: z.string(),
  month: z.string(),
  thread_id: z.string(),
  assistant_id: z.string(),

});

const CreateFollowupReport = FollowupReportFormSchema.omit({ id: true});

export async function createFollowupReport(formData:FormData) {
  console.log("adentro de createReport")
  console.log(formData);
  const { business_id, month, thread_id, assistant_id } = CreateFollowupReport.parse({
    month: formData.get('month'),
    business_id: formData.get('business_id'),
    thread_id: formData.get('thread_id'),
    assistant_id: formData.get('assistant_id'),
  });
  console.log("data enviada ",month, business_id, thread_id, assistant_id);

  const supabase = createClient();

  const { data, error } = await supabase
    .from('reports')
    .insert([
      { month: month, business_id: business_id }
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

  const { error: businessError } = await supabase
  .from('businesses')
  .update({ thread_id: thread_id, assistant_id: assistant_id })
  .eq('id', business_id);

if (businessError) {
  console.error('Error updating business table:', businessError);
  return;
}

redirect(`/admin/businesses/${business_id}/reports/${report_id}/followup-resume`);
}


export async function buildFollowupResume(formData:FormData) {
  const report_id = formData.get('report_id');
  const business_id = formData.get('business_id');
  const resume = formData.get('highlights_and_PL_analysis_response');
  const goals = formData.get('followup_goals_transcript');

  const supabase = createClient();

  const { data, error } = await supabase
    .from('reports')
    .update({ operations_resume: resume, goals: goals })
    .eq('id', report_id)

  if (error) {
    console.error('Error inserting data:', error);
  }

  redirect(`/admin/businesses/${business_id}/reports/${report_id}/followup-charts`);
}


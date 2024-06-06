"use server"

import { createClient } from '@/utils/supabase/server';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredReports(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  console.log("query", query);
  console.log("currentPage", currentPage);

  try {
    const supabase = createClient();
    const { data: reports, error } = await supabase
      .from('reports')
      .select(
        `
        id,
        business_id,
        month
      `,
        { count: 'exact' }
      )
      .ilike('month', `%${query}%`)
      .range(offset, offset + ITEMS_PER_PAGE - 1);

    if (error) {
      throw new Error('Failed to fetch reports.');
    }

    return reports;
    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reports.');
  }
}




  export async function fetchReportById(reportId:string) {
    try {
      const supabase = createClient();
      const { data: report } = await supabase
      .from('reports')
      .select(`
        *,
        business:business_id (name),
        charts(type, insights, graphy_url, id),
        recomendations(content)
      `)
      
      .eq('id', reportId)
      .single();
      console.log("report>>>>>>", reportId);
      return report;
    } catch (error) {
      console.error('Failed to fetch report by id:', error);
    }
  }

export async function fetchReportsByBusiness(business_id:string) {
  try {
    const supabase = createClient();
    const { data: reports, error } = await supabase
    .from("reports")
    .select()
    .eq('business_id', business_id);  
    
    return reports

  } catch (error) {
    console.error('Failed to fetch report by id:', error);
  }
}

export async function fetchReportsByBusinesses() {
  try {
    const supabase = createClient();

    // Obtener los IDs de los negocios
    const { data: businessIds, error: businessError } = await supabase
      .from('businesses')
      .select('id');

    if (businessError) {
      throw new Error('Failed to fetch business IDs.');
    }

    // Extraer los IDs en un array
    const ids = businessIds.map((business) => business.id);

    // Consulta principal para obtener los informes con los negocios asociados
    const { data: reports, error: reportError } = await supabase
      .from('reports')
      .select(`
        *,
        business_id(*)
      `)
      .in('business_id', ids);

    if (reportError) {
      throw new Error('Failed to fetch reports with associated businesses.');
    }
    
    return reports;
  } catch (error) {
    console.error('Failed to fetch reports with associated businesses:', error);
    throw new Error('Failed to fetch reports with associated businesses.');
  }
}

export async function fetchBusinesses() {
    try {
      const supabase = createClient();
      const { data: businesses, error } = await supabase.from("businesses").select();
  
      if (error) {
        throw new Error('Failed to fetch businesses.');
      }
  
      return businesses;
    } catch (error) {
      console.error('Failed to fetch businesses:', error);
      throw new Error('Failed to fetch businesses.');
    }
}

export async function fetchBusinessById(companyId: string) {
try {
  const supabase = createClient();
  const { data: company, error } = await supabase.from("businesses").select().eq('id', companyId).single();
  
  if (error) {
    throw new Error('Failed to fetch company.');
  }
  
  return company;
} catch (error) {
  console.error('Failed to fetch company:', error);
}
}

export async function fetchFilteredBusiness(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const supabase = createClient();
    const { data: businesses, error } = await supabase
      .from('businesses')
      .select(
        `
        id,
        name
      `,
        { count: 'exact' }
      )
      .ilike('name', `%${query}%`)
      .range(offset, offset + ITEMS_PER_PAGE - 1);

    if (error) {
      throw new Error('Failed to fetch businesses.');
    }
    
    return businesses;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch businesses.');
  }
}

export async function fetchBusinessPages(query: string) {
  try {
    const supabase = createClient();
    const { data: businesses, error } = await supabase
      .from('businesses')
      .select(
        `
        id,
        name
      `,
        { count: 'exact' }
      )
      .ilike('name', `%${query}%`)
      
    const count = businesses ? businesses.length : 0;
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    console.log("total pages", totalPages);
    return totalPages;
  } catch (error) {
    console.error('Error:', error);
    console.log("Salio mal", error);
    
  }
}

export async function fetchBusinessThreadId(businessId:string) { 
  try {
    const supabase = createClient();
    const { data: thread, error } = await supabase
      .from('businesses')
      .select('thread_id')
      .eq('id', businessId)
      .single();

    if (error) {
      throw new Error('Failed to fetch thread ID.');
    }
    return thread.thread_id;
  }
  catch (error) {
    console.error('Failed to fetch thread ID:', error);
  }
}
          

export async function fetchChartById(chartId: string) {
  try {
    const supabase = createClient();
    const { data: charts, error } = await supabase.from("charts").select().eq('id', chartId).single();
    
    if (error) {
      throw new Error('Failed to fetch charts.');
    }
    
    return charts;
  } catch (error) {
    console.error('Failed to fetch charts:', error);
  }
  }



  interface ProfileData {
    business_id: number; // Ajusta el tipo según el tipo real en tu base de datos
  }
  
  interface ReportData {
    id: number;
    month: string; // Ajusta el tipo según el tipo real en tu base de datos
    // Agrega otras propiedades de reporte según tu esquema
  }
  
  export async function getLastReport(): Promise<ReportData | null> {
    const supabase = createClient();

    try {
      // Obtener el business_id asociado al userId desde la tabla profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('business_id')
  
        .single();
  
      if (profileError) {
        throw profileError;
      }
  
      if (!profileData) {
        throw new Error('No profile found for this user');
      }
  
      const businessId = profileData.business_id;
  
      // Obtener el último reporte asociado al business_id del usuario desde la tabla reports
      const { data: reportData, error: reportError } = await supabase
        .from('reports')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
        .limit(1);
  
      if (reportError) {
        throw reportError;
      }
      console.log(reportData);
      
  
      return reportData?.[0] || null;
    } catch (error) {
      console.error('Error fetching the last report:', error);
      throw error;
    }
  }
  

  export async function fetchBusinessUsers(business_id:string) {
    try {
      const supabase = createClient();
      const { data: businessUsers, error } = await supabase
      .from("profiles")
      .select("email")
      .eq('business_id', business_id);  
      
      console.log("businessUsers", businessUsers);
      return businessUsers;
  
    } catch (error) {
      console.error('Failed to fetch business users:', error);
    }
  }
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
        recomendations(content, id, report_id)
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

export async function fetchBusinessAssistantId(businessId:string) { 
  try {
    const supabase = createClient();
    const { data: assistant, error } = await supabase
      .from('businesses')
      .select('assistant_id')
      .eq('id', businessId)
      .single();

    if (error) {
      throw new Error('Failed to fetch assistant ID.');
    }
    return assistant.assistant_id;
  }
  catch (error) {
    console.error('Failed to fetch assistant ID:', error);
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

  export async function fetchBankAccountsByBusinessId(business_id: string) {
    const supabase = createClient();
  
    const { data, error } = await supabase
      .from('bank_accounts')
      .select('*')
      .eq('business_id', business_id);
  
    if (error) {
      console.error('Error fetching bank accounts:', error);
      throw error;
    }
  
    return data;
  }

  export async function fetchDocumentsByBankId(bank_id: string) {
    const supabase = createClient();
  
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('bank_id', bank_id);
  
    if (error) {
      console.error('Error fetching bank documents:', error);
      throw error;
    }
  
    return data;
  }

  export async function fetchBankAccountById (id:string){
    const supabase = createClient();
  
    const { data, error } = await supabase
      .from('bank_accounts')
      .select('*')
      .eq('id', id);
  
    if (error) {
      console.error('Error fetching bank documents:', error);
      throw error;
    }
  
    return data;
  }

  interface Report {
    month: string;
  }
  
  // Mapa de nombres de meses a números
  const monthMap: { [key: string]: number } = {
    'Enero': 1,
    'Febrero': 2,
    'Marzo': 3,
    'Abril': 4,
    'Mayo': 5,
    'Junio': 6,
    'Julio': 7,
    'Agosto': 8,
    'Septiembre': 9,
    'Octubre': 10,
    'Noviembre': 11,
    'Diciembre': 12
  };

  const monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  export default async function getReportsByLastMovements(business_id:string) {
    const supabase = createClient()
    try {
      // Consulta para obtener todos los reportes
      const { data, error } = await supabase
        .from('reports')
        .select('month')
        .eq("business_id", business_id)
  
      if (error) {
        throw error;
      }
  
  
      // Convertir los nombres de meses a números
    const reportsWithMonthNumbers = data.map(report => ({
      ...report,
      monthNumber: monthMap[report.month]
    }));

    // Ordenar los reportes por el número de mes en orden descendente
    reportsWithMonthNumbers.sort((a, b) => b.monthNumber - a.monthNumber);

    // Obtener el último reporte basado en el valor de `monthNumber`
    const lastReport = reportsWithMonthNumbers[0];
    const currentMonthNumber = lastReport.monthNumber;
    const currentMonthName = lastReport.month;

    // Calcular el próximo mes
    const nextMonthNumber = currentMonthNumber === 12 ? 1 : currentMonthNumber + 1;
    const nextMonthName = monthNames[nextMonthNumber - 1]; // -1 porque los índices del arreglo comienzan en 0

    

    return {
      currentMonth: {
        // name: currentMonthName,
        month: currentMonthNumber
      },
      nextMonth: {
        // name: nextMonthName,
        month: nextMonthNumber
      }
    };
  } catch (error) {
    console.error('Error obteniendo el último reporte:', error);
  }
}


export async function getDocumentsByBusinessId(business_id: string) {
  const supabase = createClient();

  try {
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*, bank_accounts(name)')
      .eq("business_id", business_id)

    if (error) {
      throw error;
    }
    console.log(documents);
    
    const documentsWithMonthNumbers = documents.map(doc => {
      let closingMonthNumber = null;
      let periodEndMonthNumber = null;
      let periodStartMonthNumber = null;

      if (doc.closing_month) {
        closingMonthNumber = new Date(doc.closing_month).getMonth() + 1; // Obtener el número de mes de closing_month
      }

      if (doc.period_end) {
        periodEndMonthNumber = new Date(doc.period_end).getMonth() + 1; // Obtener el número de mes de period_end
      }

      if (doc.period_start) {
        periodStartMonthNumber = new Date(doc.period_start).getMonth() + 1; // Obtener el número de mes de period_end
      }

      return {
        ...doc,
        closing_month: closingMonthNumber,
        period_end: periodEndMonthNumber,
        period_start: periodStartMonthNumber
      };
    });

    console.log("Documentos con números de mes:", documentsWithMonthNumbers);

    return documentsWithMonthNumbers;

  } catch (error) {
    console.error('Error obteniendo documentos:', error);
  }
}

 export async function getAllDocuments(business_id: string) {

   const supabase = createClient();

   //Encontrar el document donde el closing_month === month o period_end === month o period_start === month

   try {
     const { data, error } = await supabase
   .from('documents')
   .select('*, bank_accounts(name, type)')
   // .or('closing_month.eq.2023-05-01,and(period_end.gt.2024-04-01,period_end.lt.2024-05-01),and(period_start.gt.2024-04-01,period_start.lt.2024-05-01)')
   .eq('business_id', business_id)
   // .or('closing_month.eq.2024-03-31,period_end.lt.2024-05-01')
   // .filter('closing_month', 'eq', '2024-03-31')
     if (error) {
       throw error;
     }

     console.log(data);

     return data
    
   } catch (error) {
     console.error('Error obteniendo documentos:', error);
   }
 }


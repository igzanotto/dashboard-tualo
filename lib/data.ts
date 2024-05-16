import { createClient } from '@/utils/supabase/server';

    const REPORTS_PER_PAGE = 5;
    export async function fetchFilteredReports(
      query: string,
      currentPage: number
    ) {
      const offset = (currentPage - 1) * REPORTS_PER_PAGE;
    
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
          .range(offset, offset + REPORTS_PER_PAGE - 1);
    
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
      const { data: report, error } = await supabase
      .from('reports')
      .select(`
        *,
        business:business_id (name),
        charts(type, insights)
      `)
      
      .eq('id', reportId)
      .single();

      if (error) {
        throw new Error('Failed to fetch report.');
      }

      console.log("report>>>>>>", report);
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

    export async function fetchBusinessById(companyId:string) {
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



    const ITEMS_PER_PAGE = 6;
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
import { createClient } from '@/utils/supabase/server';

  export async function fetchReports() {
    try {
      const supabase = createClient();
      const { data: reports, error } = await supabase.from("reports").select();
  
      if (error) {
        throw new Error('Failed to fetch REPORTS.');
      }
  
      return reports;
    } catch (error) {
      console.error('Failed to fetch REPORTS:', error);
      throw new Error('Failed to fetch REPORTS.');
    }
  }
 

  export async function fetchCompanies() {
      try {
        const supabase = createClient();
        const { data: companies, error } = await supabase.from("companies").select();
    
        if (error) {
          throw new Error('Failed to fetch companies.');
        }
    
        return companies;
      } catch (error) {
        console.error('Failed to fetch companies:', error);
        throw new Error('Failed to fetch companies.');
      }
    }

    export async function fetchCompanyById(companyId:string) {
      try {
        const supabase = createClient();
        const { data: company, error } = await supabase.from("companies").select().eq('id', companyId).single();
        
        if (error) {
          throw new Error('Failed to fetch company.');
        }
        
        return company;
      } catch (error) {
        console.error('Failed to fetch company:', error);
      }
    }
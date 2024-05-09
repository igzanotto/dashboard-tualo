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
 

    export async function fetchBuisnesses() {
        try {
          const supabase = createClient();
          const { data: buisnesses, error } = await supabase.from("buisnesses").select();
      
          if (error) {
            throw new Error('Failed to fetch buisnesses.');
          }
      
          return buisnesses;
        } catch (error) {
          console.error('Failed to fetch buisnesses:', error);
          throw new Error('Failed to fetch buisnesses.');
        }
      }
"use server"

import { createClient } from "@/utils/supabase/server";

export async function CreateCompany(name:string) {
    const supabase = createClient();
    
    const result = await supabase.from('companies').insert({ name }).single();

    return JSON.stringify(result);
}
import { createClient } from '@supabase/supabase-js'

export const createAdmin = () => createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.SUPABASE_SERVICE_ROLE_KEY!, 
    {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
    },
    }
)

// this is neccesary to some functions such as creating new users from the admin panel
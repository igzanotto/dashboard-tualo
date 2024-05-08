import { createClient } from '@/utils/supabase/server';


export default async function Page() {

  const supabase = createClient();

  // llama a la table profiles todos los users pero por una policy se limita al profile que conincide con el user que lo pide
  const profileIsAdmin = await supabase.from('profiles').select('admin').single();
  

  return (

    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>
        admin
      </h1>
      {/* <pre>{JSON.stringify(profiles, null, 2)}</pre> */}
      
    </main>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export default async function GoogleLoginButton() {

  const handleLogin = async () => {
    "use server";
    
    console.log("login with google");
    const supabase = createClient();
    const origin = headers().get("origin");
    
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",

      // Le digo a google que a la vuelta me redirija a auth/callback/route.ts
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("error", error);
    } else {
      console.log("data", data)
      redirect(data.url);
    }
  };

  return (
    <form action={handleLogin}>
      <button className="text-white text-bold bg-blue-500 rounded-md px-4 py-2 text-foreground mb-2" >
        Login con google
      </button>
    </form>
  );
}

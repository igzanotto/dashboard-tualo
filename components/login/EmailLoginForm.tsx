
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SubmitButton } from './submit-button';
import LogoScrolled from '../icons/LogoScrolled';

export default function EmailLoginForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("error login",error);
      return redirect(`/login?message=${error}`);
    }

    return redirect('/admin');
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const supabase = createClient();
    // const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: `${origin}/auth/callback`,
      // },
    });

    if (error) {
      console.log(error);
      return redirect('/login?message=Could not authenticate user');
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard');
  };




  return (
    <form className="space-y-3">
        <div className='flex justify-center'>
          <LogoScrolled/>
        </div>
        {/* <p className={`mb-3 text-lg`}>
          Inicie sesión para continuar
        </p> */}
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Ingrese su dirección de email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4 mb-6">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6 mt-8'>
        <SubmitButton
          formAction={signIn}
          className="w-full"
          pendingText="Iniciando sesión..."
        >
          Iniciar sesión
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="w-full bg-slate-500"
          pendingText="Registrando..."
        >
          Registrarse
        </SubmitButton>
        </div>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
    </form>
  );
}


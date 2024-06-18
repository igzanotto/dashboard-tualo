import LogoScrolled from '@/components/icons/LogoScrolled';
import { SubmitButton } from '@/components/login/submit-button';
import { createClient } from '@/utils/supabase/server';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string, email: string};
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const confirmationCode = formData.get('confirmationCode') as string;
    const supabase = createClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: email,
      token: confirmationCode,
      type: 'email',
    });

    if (error) {
      console.log('error login', error);
      return redirect(`/auth/confirm-invite?message=${error}`);
    }

    return redirect('/auth/set-password');
  };


  return (
    <div className="mx-auto gap-2 p-8 sm:max-w-md bg-[#252525]/10 mt-[5%] justify-center rounded-xl shadow-lg">
    <form className="space-y-3">
        <div className='flex justify-center'>
          <LogoScrolled/>
        </div>
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
                placeholder='Ingrese su email'
                defaultValue={searchParams?.email}
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
              Código de confirmación
            </label>
            <div className="relative">
            <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          id="confirmation-code"
          type="text"
          name="confirmationCode"
          placeholder="Ingrese el código de confirmación"
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
          Confirmar
        </SubmitButton>
        
        </div>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
    </form>
    </div>
  );
}

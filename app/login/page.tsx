import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../ui/login/submit-button';
import { revalidatePath } from 'next/cache';
import GoogleLoginButton from '../ui/login/GoogleLoginButton';
import EmailLoginForm from '../ui/login/EmailLoginForm';

export default function Page({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  return (
    <div className="mx-auto gap-2 p-8 sm:max-w-md">
      <EmailLoginForm searchParams={searchParams} />
      <GoogleLoginButton />
    </div>
  );
}

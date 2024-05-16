import EmailLoginForm from "@/components/login/EmailLoginForm";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";


export default function LoginPage({
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

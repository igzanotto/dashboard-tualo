import EmailLoginForm from "@/components/login/EmailLoginForm";
import GoogleLoginButton from "@/components/login/GoogleLoginButton";


export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  return (
    <div className="mx-auto gap-2 p-8 sm:max-w-md bg-[#252525]/10 mt-[5%] justify-center rounded-xl shadow-lg">
      <EmailLoginForm searchParams={searchParams} />
      <GoogleLoginButton />
    </div>
  );
}

import Link from 'next/link';


export default function Page() {

  return (
    <main className='flex flex-col items-center justify-center mt-[25%]'>
      <Link href={"/login"} className='bg-blue-500 text-white p-4 rounded-xl text-center'>
        Go to Login
      </Link>
    </main>
  );
}

import { fetchCompanies} from '@/app/lib/data';
import Link from 'next/link';


export default async function Page(
    // esto todabia no se esta usando pero estaria bueno meterlo para el pagination
//   {
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }
) {
  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
  const companies = await fetchCompanies()

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Negocios</h1>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-4 mt-10'>
        {
          companies.map(company => (
            <div key={company.id} className='bg-blue-500 p-5 rounded-xl text-white w-[250px] h-[100px] text-center '>
              <p>{company.name}</p>
            </div>
          ))
        }
        <Link href={"/pages/admin/negocios/create"} className='bg-blue-800 p-5 rounded-xl text-white w-[250px] h-[100px] text-center flex flex-col justify-center gap-2 items-center'>
          Agregar nuevo negocio
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#ffffff"></path> </g></svg>
        </Link>
      </div>
    </div>
  );
}

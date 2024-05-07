
import { lusitana } from '@/app/ui/fonts';
import { fetchCompanies, fetchInvoicesPages } from '@/app/lib/data';
import AddCompanyForm from '@/app/ui/invoices/form-companies';


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  const companies = await fetchCompanies()

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Negocios</h1>
      </div>
      <div className='flex items-center justify-center gap-4 flex-wrap mt-10'>
        {
          companies.map(company => (
            <div className='bg-blue-500 p-5 rounded-xl text-white w-[150px] h-[100px] text-center '>
              <p>{company.name}</p>
            </div>
          ))
        }
      <AddCompanyForm/>
      </div>
    </div>
  );
}

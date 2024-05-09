import { fetchReports} from "@/app/lib/data";
import AddIcon from "@/components/icons/AddIcon";
import Link from 'next/link';

export default async function Page({ id }: { id: string }){

    
    const reports = await fetchReports()


    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`text-2xl`}>Reportes</h1>
        </div>
        <div className="flex flex-col gap-2 w-full border-1 bg-gray-50 rounded-xl p-4 mt-10">
          {reports.map((report) => (
            <div className="border-2 border-slate-200 p-2 rounded-xl">
                <Link
                    href={`/admin/reports/${report.id}`}
                    key={report.id}
                    className='flex items-center gap-2'
                >
                <p className="capitalize">{report.month}</p>
                </Link>
            </div>
          ))}

        </div>
          <Link
            href={'/admin/reports/create'}
            className="mt-7 flex w-[220px] items-center gap-2 rounded-xl bg-blue-800 p-2 text-white"
          >
            Agregar nuevo negocio
            <AddIcon/>
          </Link>
      </div>
    );
}

import { fetchReports } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {

  const fetchreports = await fetchReports();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Reportes
      </h1>
      <ul className='flex flex-col gap-4'>
        {fetchreports.map(report => (
          <li key={report.id}>
            <p>ID: {report.id}</p>
            <p>Fecha de creación: {report.created_at}</p>
            <p>ID de la empresa: {report.company_id}</p>

          </li>
        ))}
      </ul>
      <button>ola</button>
    </main>
  );
}

import { getLastReport } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function Page() {

  const report = await getLastReport();

  if (report) {
    const { id, month } = report;
    return redirect(`/dashboard/reports/${id}/${month}`);
  }

  return (
    <div>
      <h1>Aun no tienes reportes</h1>
    </div>
  )

}

import ChartsGenerator from '@/components/admin/reports/generators/charts-generator';
import { fetchBusinessThreadId } from '@/lib/data';

export default async function BuildChartsPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
        <ChartsGenerator threadId={threadId} />
      </div>
    </main>
  );
}

import PLGenerator from '@/components/admin/reports/generators/PL-generator';
import { fetchBusinessThreadId } from '@/lib/data';

export default async function BuildPLPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
        <PLGenerator threadId={threadId} />
      </div>
    </main>
  );
}

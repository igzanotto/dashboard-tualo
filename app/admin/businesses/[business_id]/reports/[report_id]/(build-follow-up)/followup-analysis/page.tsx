import FollowupAnalysisGenerator from '@/components/admin/reports/generators/followup-analysis-generator';
import { fetchBusinessThreadId } from '@/lib/data';

export default async function BuildFollowupAnalysisPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
        <FollowupAnalysisGenerator threadId={threadId} />
      </div>
    </main>
  );
}

import FollowUpGenerator from '@/components/admin/reports/generators/follow-up-generator';
import { fetchBusinessThreadId } from '@/lib/data';


export default async function CreateReportFollowPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
        <FollowUpGenerator threadId={threadId} />
      </div>
    </main>
  );
}

import FollowUpThreadAndMonth from '@/components/admin/reports/generators/followup-thread-and-month';
import { fetchBusinessAssistantId, fetchBusinessThreadId } from '@/lib/data';

export default async function CreateReportFollowPage({
  params,
}: {
  params: any;
}) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);
  const assistant_id = await fetchBusinessAssistantId(business_id);

  return (
    <main>
      <div className="mt-3">
        <FollowUpThreadAndMonth threadId={threadId} assistantId={assistant_id}/>
      </div>
    </main>
  );
}

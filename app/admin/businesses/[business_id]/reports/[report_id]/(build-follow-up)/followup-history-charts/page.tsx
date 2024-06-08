import FollowupHistoryChartsGenerator from "@/components/admin/reports/generators/followup-history-charts-generator";
import { fetchBusinessThreadId } from "@/lib/data";

export default async function BuilFollowupChartsPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
        <FollowupHistoryChartsGenerator threadId={threadId} />
      </div>
    </main>
  );
}
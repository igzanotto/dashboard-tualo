import FollowupChartsGenerator from "@/components/admin/reports/generators/followup-charts-generator";
import { fetchBusinessThreadId } from "@/lib/data";

export default async function BuilFollowupChartsPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
        <FollowupChartsGenerator threadId={threadId} />
      </div>
    </main>
  );
}
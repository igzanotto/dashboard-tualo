import GoalsGenerator from "@/components/admin/reports/goals-generator";
import { fetchBusinessThreadId } from "@/lib/data";

export default async function BuildReportPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
       <GoalsGenerator threadId={threadId} />
      </div>
    </main>
  );
}
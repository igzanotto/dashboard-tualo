import AnalysisGenerator from "@/components/admin/reports/analysis-generator";
import { fetchBusinessThreadId } from "@/lib/data";

export default async function BuildReportPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
       <AnalysisGenerator threadId={threadId} />
      </div>
    </main>
  );
}
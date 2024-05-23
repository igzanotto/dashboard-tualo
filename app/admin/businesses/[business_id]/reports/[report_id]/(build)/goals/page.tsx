import ReportGenerator from "@/components/admin/reports/generator";
import { fetchBusinessThreadId } from "@/lib/data";

export default async function BuildReportPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
       <ReportGenerator threadId={threadId} />
      </div>
    </main>
  );
}
import ReportGenerator from "@/components/admin/reports/generator";
import ServerFetcher from "@/components/admin/reports/server-fetcher";
import { fetchBusinessThreadId } from "@/lib/data";

export default async function BuildReportPage({ params }: { params: any }) {
  const { id } = params;
  const threadId = await fetchBusinessThreadId(id);

  return (
    <main>
      <div className="mt-3">
       {/* <ServerFetcher businessId={id} /> */}
       <ReportGenerator threadId={threadId} />
      </div>
    </main>
  );
}
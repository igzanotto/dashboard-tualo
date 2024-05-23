import ServerFetcher from "@/components/admin/reports/server-fetcher";

export default function BuildReportPage({ params }: { params: any }) {
  const { id } = params;

  return (
    <main>
      <div className="mt-3">
       <ServerFetcher businessId={id} />
      </div>
    </main>
  );
}
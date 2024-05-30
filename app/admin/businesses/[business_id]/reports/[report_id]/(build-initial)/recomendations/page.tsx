import RecomendationsGenerator from "@/components/admin/recomendations/recomendations-generator";
import { fetchBusinessThreadId } from "@/lib/data";

export default async function BuildRecomendationsPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
       <RecomendationsGenerator threadId={threadId} />
      </div>
    </main>
  );
}
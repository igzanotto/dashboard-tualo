import FollowupRecomendationsGenerator from "@/components/admin/recomendations/followup-recomendations-generator";
import { fetchBusinessThreadId } from "@/lib/data";

export default async function BuilFollowupRecomendationsPage({ params }: { params: any }) {
  const { business_id } = params;
  const threadId = await fetchBusinessThreadId(business_id);

  return (
    <main>
      <div className="mt-3">
       <FollowupRecomendationsGenerator threadId={threadId} />
      </div>
    </main>
  );
}
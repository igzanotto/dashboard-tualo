import { fetchBusinessThreadId } from '@/lib/data';
import ReportGenerator from './generator';


export default async function ServerFetcher({businessId}: {businessId: string}) {

    const threadId = await fetchBusinessThreadId(businessId);

    console.log('threadId from fetcher', threadId);

    return (
        <div>
            <h1>Server Component</h1>
            <ReportGenerator threadId={threadId} />
        </div>
    );
}

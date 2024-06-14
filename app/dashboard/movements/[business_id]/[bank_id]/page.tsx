"use client"

import { fetchDocumentsByBankId } from "@/lib/data";
import { useEffect, useState } from "react"


type Document = {
    id: string;
    closing: Date;
    bank_id:string;
    pdf:string
}

export default function DocumentPage({params}: {params: { bank_id:string } }){
    const [document, setDocument] = useState<Document[] | null>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBankDocuments = async () => {
            try {
                setLoading(true);
                const documents = await fetchDocumentsByBankId(params.bank_id)
                setDocument(documents)
                console.log(documents);
                
            } catch (error) {
            setError('Failed to fetch data');
            } finally {
            setLoading(false);
            }
        }
        fetchBankDocuments()
    }, [params.bank_id])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    return(
        <div>
            {document?.map((data) => (
                <div className="text-black">
                    <p>{data.id}</p>
                    <p>{data.pdf}</p>
                </div>
            ))}
        </div>
    )
}
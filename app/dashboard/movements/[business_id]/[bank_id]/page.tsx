"use client"

import { fetchBankAccountById, fetchBankAccountsByBusinessId, fetchBusinessById, fetchDocumentsByBankId } from "@/lib/data";
import { LinkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"


type Document = {
    id: string;
    closing: string;
    bank_id:string;
    pdf:string
}

type Bank = {
    name: string
}

export default function DocumentPage({params}: {params: { bank_id:string, business_id:string } }){
    const [document, setDocument] = useState<Document[] | null>([])
    const [bank, setBankName] = useState<Bank | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBankDocuments = async () => {
            try {
                setLoading(true);
                const documents = await fetchDocumentsByBankId(params.bank_id)
                const bankDataArray: Bank[] = await fetchBankAccountById(params.bank_id);

                if (bankDataArray.length > 0) {
                    setBankName(bankDataArray[0]); // Asigna el primer objeto del arreglo
                } else {
                    setBankName(null);
                }

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
                <div className="flex flex-col gap-6">
                    <h2 className="text-lg font-bold">Movimientos de {bank?.name}</h2>
                    <div className="flex flex-col gap-4">
                        <p>Fecha de cierre</p>
                        <p className="font-medium text-3xl text-[#003E52]">{data.closing}</p>
                    </div>
                    <div className="w-[180px]">
                        <Link target="_blank" href={data.pdf} className="p-2 rounded-lg bg-[#003E52] text-white flex items-center gap-2 justify-center">
                            <LinkIcon width={20} height={20}/>
                            Movimiento
                        </Link>
                    </div>
                   
                </div>
            ))}
        </div>
    )
}
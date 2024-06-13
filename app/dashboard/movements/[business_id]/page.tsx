import { fetchBusinessById } from "@/lib/data"

export default function MovementsPage({params}: {params: {business_id:string}}){

    const business = fetchBusinessById(params.business_id)

    return(
        <div>
            <p>hola</p>
            <p>{params.business_id}</p>
        </div>
    )
}
import { fetchCompanyById } from "@/app/lib/data";

export default async function BusinessPage({ params }: { params: { id: string } }){
    const id = params.id;

    const company = await fetchCompanyById(id)

    return(
        <div>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
        </div>
    )
}
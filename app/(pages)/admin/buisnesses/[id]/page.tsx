import { fetchBusinessById } from "@/app/lib/data";

export default async function BusinessPage({ params }: { params: { id: string } }){
    const id = params.id;

    const company = await fetchBusinessById(id)

    return(
        <div className="flex flex-col gap-3">
            <h1 className="text-xl md:text-2xl xl:text-5xl">{company.name}</h1>
            <p>{company.description}</p>
        </div>
    )
}


export async function POST(  req: Request
    ) {
        const { text } = await req.json()  
        
        console.log("halamskndl", text)

        return new Response("ok")
    }
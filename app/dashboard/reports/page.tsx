"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"


export default async function ReportsPageDashboard (){

    

    useEffect(() => {
        redirect(`/dashboard/reports/3/enero`)
    }, [])

    return(
        <div>
            
            
        </div>
    )
}
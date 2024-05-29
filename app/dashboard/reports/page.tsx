"use client"

import { fetchLatestReportId } from "@/lib/data"; // Supongo que tienes una función para obtener el último ID
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReportsPageDashboard() {
    const [latestReportId, setLatestReportId] = useState<string | null>(null);

    useEffect(() => {
        async function getLatestReportId() {
            const latestId = await fetchLatestReportId();
            setLatestReportId(latestId);
        }

        getLatestReportId();
    }, []);

    useEffect(() => {
        if (latestReportId) {
            redirect(`/dashboard/reports/${latestReportId}`);
        }
    }, [latestReportId]);

    return (
        <div>
            {/* Puedes mostrar un mensaje de carga o dejar el div vacío */}
        </div>
    );
}

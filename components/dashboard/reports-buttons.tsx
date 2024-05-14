"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ButtonProps {
    path: string;
    month: string;
    id?: string;
}

export default function ReportsButton({ path, month, id }: ButtonProps) {
    const pathname = usePathname();
    const isActive = pathname === path;

    return (
        <Link key={id} href={path} className={`${isActive ? "bg-gradient-to-r from-[#4C30C5] to-[#39AEFF]" : "bg-gray-100"} w-[110px] py-2 rounded-xl`}>
            <p className={`${isActive ? "text-white font-semibold" : "font-semibold"} text-center capitalize`}>{month}</p>
        </Link>
    );
}

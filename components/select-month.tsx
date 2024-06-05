"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

interface Report {
    id: string;
    month: string;
}

interface MonthDropdownProps {
    reports: Report[];
}

const SelectMonth: React.FC<MonthDropdownProps> = ({ reports }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>('Mes');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname()
    const pathnameParts = pathname.split('/');
    const reportId = pathnameParts[pathnameParts.length - 1];


    const handleMonthSelect = (month: string) => {
        setSelectedMonth(month);
        setIsOpen(false); // Cierra el dropdown al seleccionar un mes
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                onClick={toggleDropdown}
                className="w-full flex items-center gap-2 text-center capitalize px-4 py-2 bg-[#0065A1] border text-white text-xl font-medium border-gray-300 shadow-sm rounded-lg"
            >
                {selectedMonth}
                <ChevronDownIcon width={20} height={20}/>
            </button>
            {isOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 shadow-lg flex flex-col gap-2 rounded-lg p-2">
                    {reports.map((report) => (
                        <Link
                            key={report.id}
                            href={`/dashboard/reports/${report.id}`}
                            passHref
                            onClick={() => handleMonthSelect(report.month)}
                            className='capitalize p-2 bg-gray-100 rounded-lg'
                        >
                            {report.month}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectMonth;

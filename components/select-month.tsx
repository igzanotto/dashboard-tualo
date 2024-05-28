"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Report {
    id: string;
    month: string;
}

interface MonthDropdownProps {
    reports: Report[];
}

const SelectMonth: React.FC<MonthDropdownProps> = ({ reports }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleMonthSelect = (month: string) => {
        setSelectedMonth(month);
        setIsOpen(false); // Cierra el dropdown al seleccionar un mes
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block w-40">
            <button
                onClick={toggleDropdown}
                className="w-full text-center capitalize px-4 py-2 bg-[#0065A1] border text-white text-xl font-medium border-gray-300 shadow-sm rounded-lg"
            >
                {selectedMonth || 'Seleccionar mes'}
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

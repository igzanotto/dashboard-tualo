"use client"
import React, { useState } from 'react';

const Page = () => {
    const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

    const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedMonths(selectedOptions);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Select Months</h1>
            <form>
                <label htmlFor="months" className="block mb-2">Choose one or more months:</label>
                <select id="months" multiple value={selectedMonths} onChange={handleMonthSelect} className="border border-gray-300 rounded p-2 mb-2">
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default Page;
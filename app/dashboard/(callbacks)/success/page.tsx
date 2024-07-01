"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

const SuccessPage: React.FC = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const status = params.get('status')

    // it updates the user status in the db to active using data actions
    
    
    

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your subscription payment.</p>
        </div>
    );
};

export default SuccessPage;

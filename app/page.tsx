'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import ApiForm from '@/components/admin/api-form';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';


export default function Page() {
  useEffect(() => {
    redirect('/login')
  }, [])
  
  return (
   <>
   </>
  );
}

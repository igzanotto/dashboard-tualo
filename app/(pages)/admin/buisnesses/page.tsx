import { fetchBuisnesses } from '@/app/lib/data';
import Link from 'next/link';
import {BuildingOfficeIcon} from "@heroicons/react/24/outline"


export default async function Page({ id }: { id: string }) {
  
  const buisnesses = await fetchBuisnesses()
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Negocios</h1>
      </div>
      <div className='flex flex-col gap-2 w-full border-1 bg-gray-50 rounded-xl p-4 mt-10'>
        {
          buisnesses.map(buisness => (
            <div className='border-2 border-slate-200 p-2 rounded-xl'>
              <Link href={`/admin/buisnesses/${buisness.id}`} key={buisness.id} className='flex items-center gap-2'>
                <BuildingOfficeIcon className='w-7 h-7'/>
                <p>{buisness.name}</p>
              </Link>
            </div>
          ))
        }
      </div>
        <Link href={"/admin/buisnesses/create"} className='flex items-center bg-blue-800 p-2 rounded-xl text-white gap-2 w-[220px] mt-7'>
          Agregar nuevo negocio
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#ffffff"></path> </g></svg>
        </Link>
    </div>
  );
}

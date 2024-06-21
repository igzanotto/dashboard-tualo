import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletonMovements = () => {
  return (
        <div className='max-lg:hidden flex flex-col gap-10 mt-[10%] px-4'>
            <div>
                <Skeleton className="w-[200px] h-[30px] rounded-xl flex"/>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                </div>
                <div className='flex items-center gap-2'>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                </div>
                <div>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                </div>
                <div className='flex items-center gap-2'>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                </div>
                <div>
                    <Skeleton className="h-[200px] w-[200px] rounded-xl flex mx-auto"/>
                </div>

            </div>
            
        </div>

  )
    
}

export default SkeletonMovements;
import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletonMovementsMobile = () => {
  return (
        <div className='lg:hidden'>
            <Skeleton className="w-[200px] h-[30px] rounded-xl flex mx-auto mt-[12%]"/>
            <Skeleton className="h-[500px] w-[95%] rounded-xl flex mx-auto mt-[20%]"/>
            <Skeleton className="h-[500px] w-[95%] rounded-xl flex mx-auto mt-[20%]"/>
        </div>

  )
    
}

export default SkeletonMovementsMobile;
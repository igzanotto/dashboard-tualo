'use client'

import Lottie from "lottie-react"
import dashboard from './phone2.json'

export default function DashboardMobile(){
    return(
        <Lottie id="lottie" animationData={dashboard} loop={true} className="w-[550px] h-[550px] max-sm:w-[300px] max-sm:h-[300px] max-xl:w-[400px] max-xl:h-[400px]" />
    )
}
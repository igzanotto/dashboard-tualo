'use client'

import Lottie from "lottie-react"
import animationHome from './home3.json'

export default function ChartAnimation(){
    return(
        <Lottie id="lottie" animationData={animationHome} loop={true} className="w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px] max-xl:w-[400px] max-xl:h-[400px] 2xl:w-[550px] 2xl:h-[550px]" />
    )
}
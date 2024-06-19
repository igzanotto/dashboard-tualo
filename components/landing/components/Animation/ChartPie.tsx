'use client'

import Lottie from "lottie-react"
import chartPie from './chart.json'

const ChartPie = () => {
  return (
    <Lottie id="lottie" animationData={chartPie} loop={true} className="w-[450px] h-[450px] max-sm:w-[300px] max-sm:h-[300px] max-xl:w-[400px] max-xl:h-[400px]" />
  )
}

export default ChartPie
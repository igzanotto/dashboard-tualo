import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
  return (
        <Link data-aos="zoom-in-up" href={"https://calendly.com/jorge-tualo/business-initial-interview"} target="_blank" className="bg-[#ff6c0e] text-white font-semibold mt-8 w-[230px] max-lg:self-center p-3 rounded-xl text-center hover:bg-[#ff9655] transition-all">
          ¡Quiero probarlo!   
        </Link>
  )
}

export default CallToAction
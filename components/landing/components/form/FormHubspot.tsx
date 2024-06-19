import React from 'react'
import '../../../../app/landing/globals.css'
import CallToAction from '../Buttons/CallToAction'

const FormHubspot = () => {
  return (
    <div className='flex items-center flex-col gap-4 justify-center bg-white pt-20 pb-52'>
        <p className='my-10 text-center font-semibold sm:text-xl max-sm:px-5 md:text-2xl lg:text-3xl bg-gradient-to-r from-[#0065A1] to-[#00AE8D] bg-clip-text text-transparent'>
          Tú también retoma el control de tu negocio, sin perder tiempo ni dinero.
        </p>
        <CallToAction/>
    </div>
  )
}

export default FormHubspot
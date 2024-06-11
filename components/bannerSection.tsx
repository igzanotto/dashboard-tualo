import { Libre_Baskerville } from 'next/font/google';
import '../app/globals.css'

const libreBaskerville = Libre_Baskerville({subsets:["latin"], weight:["400", "700"]})

interface Props{
    text:string
    id?:string
    // icon: JSX.Element
}

const BannerSection = ({text, id}:Props) => {
  return (
        <div className={`section-margin w-full rounded-2xl p-5 bg-gradient-to-r from-[#0065A1] to-[#00AE8D] flex items-center justify-between max-lg:w-[96%] max-lg:mx-auto` } id={id}>
        <p className={`${libreBaskerville.className} text-white text-3xl max-md:text-xl`} >{text}</p>
        {/* {icon} */}
      </div>
  )
}

export default BannerSection
import { Libre_Baskerville } from 'next/font/google';


const libreBaskerville = Libre_Baskerville({subsets:["latin"], weight:["400", "700"]})

interface Props{
    text:string
}

const BannerSection = ({text}:Props) => {
  return (
        <div className={`w-full rounded-2xl p-5 bg-gradient-to-r from-[#0065A1] to-[#00AE8D] flex items-center justify-between max-lg:w-[98%] max-lg:mx-auto` }>
        <p className={`${libreBaskerville.className} text-white text-3xl`} >{text}</p>
      </div>
  )
}

export default BannerSection
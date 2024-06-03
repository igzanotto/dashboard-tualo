import { Libre_Baskerville } from 'next/font/google';


const libreBaskerville = Libre_Baskerville({subsets:["latin"], weight:["400", "700"]})

interface Props{
    text:string
}

const BannerReferidos = ({text}:Props) => {
  return (
        <div className={`w-full rounded-2xl p-4 max-md:p-3 bg-[#FF6C0E] flex items-center max-lg:w-[98%] max-lg:mx-auto justify-center` }>
        <p className={`${libreBaskerville.className} text-white text-2xl text-center max-md:text-xl`} >{text}</p>
      </div>
  )
}

export default BannerReferidos
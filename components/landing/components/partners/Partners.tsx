import React from 'react'
import { Cards } from './Cards'

const Partners = () => {
  return (
    <div className='bg-white flex flex-col py-20 max-md:py-0 max-md:pt-20' id="clientes">
        <p className='max-md:mt-10 text-xl text-center font-semibold sm:text-xl max-sm:px-5 md:text-2xl lg:text-3xl bg-gradient-to-r from-[#0065A1] to-[#00AE8D] bg-clip-text text-transparent md:px-4'>Algunos negocios que ya duermen tranquilos gracias a nuestra solución</p>
        <div className='mt-10 max-md:mt-0'>

            <Cards 
                items={images}
                direction="right"
                speed="normal"
                />
        </div>
    </div>
  )
}
const images = [
    // {
    //   image: "https://i.postimg.cc/2qf7fxnD/amin.png",
    // },
    // {
    //     image: "https://i.postimg.cc/4n4wdwq4/armario.png",
    // },
    // {
    //     image: "https://i.postimg.cc/KkG71v9p/deleite.png",
    // },
    {
        image: "https://i.postimg.cc/0MQXzczM/gallo-media.png"
    },
    // {
    //     image: "https://i.postimg.cc/2VVwdyCP/hijoa.png"
    // },
    {
        image: "https://i.postimg.cc/KkqVfC6D/1.png"
    },
    {
        image: "https://i.postimg.cc/2VWYjFL8/casakooch.png"
    },
    {
        image: "https://i.postimg.cc/jnwb7y8c/memoria1.png"
    },
    // {
    //     image: "https://i.postimg.cc/4YcQM07P/pargot.png"
    // },
    {
        image: "https://i.postimg.cc/5j61TMxz/pinguino1.png"
    },
    // {
    //     image: "https://i.postimg.cc/Z0DPqm6j/slidejob.png"
    // },
    {
        image: "https://i.postimg.cc/8sxXCdNc/renata-pasteles.png"
    },
    {
        image: "https://i.postimg.cc/hhX3gZFN/rufina.png"
    },
  ];

export default Partners
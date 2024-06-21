import React from 'react'
import banorte from '../images/banks/banorte.png'
import Image from 'next/image'

const BanorteIcon = () => {
  return (
    <Image src={banorte} alt="banorte" width={35} height={35}/>
  )
}

export default BanorteIcon
import React from 'react'
import santander from '../images/banks/santander.png'
import Image from 'next/image';


const SantanderIcon = () => {
  return (
    <Image src={santander} alt="santander" width={35} height={35}/>

  )
}

export default SantanderIcon
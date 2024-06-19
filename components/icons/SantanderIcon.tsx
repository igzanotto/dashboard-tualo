import React from 'react'
import santander from '../images/banks/santander.png'
import Image from 'next/image';


const SantanderIcon = () => {
  return (
    <Image src={santander} alt="santander" width={30} height={30}/>

  )
}

export default SantanderIcon
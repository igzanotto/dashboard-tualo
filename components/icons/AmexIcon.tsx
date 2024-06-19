import React from 'react'
import amex from '../images/banks/amex.png'
import Image from 'next/image';

const AmexIcon = () => {
  return (
    <Image src={amex} alt="amex" width={30} height={30}/>

  )
}

export default AmexIcon
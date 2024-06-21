import React from 'react'
import amex from '../images/banks/amex.png'
import Image from 'next/image';

const AmexIcon = () => {
  return (
    <Image src={amex} alt="amex" width={35} height={35}/>

  )
}

export default AmexIcon
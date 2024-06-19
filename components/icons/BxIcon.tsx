import React from 'react'
import bx from '../images/banks/bx.png'
import Image from 'next/image';

const BxIcon = () => {
  return (
    <Image src={bx} alt="bx" width={30} height={30}/>
  )
}

export default BxIcon
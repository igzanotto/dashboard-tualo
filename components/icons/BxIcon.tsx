import React from 'react'
import bx from '../images/banks/bx.png'
import Image from 'next/image';

const BxIcon = () => {
  return (
    <Image src={bx} alt="bx" width={35} height={35}/>
  )
}

export default BxIcon
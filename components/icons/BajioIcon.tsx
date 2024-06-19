import React from 'react'
import bajio from '../images/banks/bajio.png'
import Image from 'next/image';

const BajioIcon = () => {
  return (
    <Image src={bajio} alt="bajio" width={30} height={30}/>

  )
}

export default BajioIcon
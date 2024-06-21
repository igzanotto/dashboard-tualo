import React from 'react'
import albo from '../images/banks/albo.png'
import Image from 'next/image';

const AlboIcon = () => {
  return (
    <Image src={albo} alt="albo" width={35} height={35}/>

  )
}

export default AlboIcon
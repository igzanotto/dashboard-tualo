import React from 'react'
import hsbc from '../images/banks/hsbc.png'
import Image from 'next/image';


const HsbcIcon = () => {
  return (
    <Image src={hsbc} alt="hsbc" width={35} height={35}/>

  )
}

export default HsbcIcon
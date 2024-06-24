import React from 'react'
import broxel from '../images/banks/broxel.png'
import Image from 'next/image'

const BroxelIcon = () => {
  return (
    <Image src={broxel} alt="broxel" width={35} height={35}/>

  )
}

export default BroxelIcon
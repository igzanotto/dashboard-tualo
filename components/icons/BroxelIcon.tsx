import React from 'react'
import broxel from '../images/banks/broxel.png'
import Image from 'next/image'

const BroxelIcon = () => {
  return (
    <Image src={broxel} alt="broxel" width={30} height={30}/>

  )
}

export default BroxelIcon
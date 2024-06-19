import React from 'react';
import bbva from '../images/banks/bbva.png'
import Image from 'next/image';

const BbbvaIcon = () => {
  return (
    <Image src={bbva} alt="BBVA" width={30} height={30}/>
  );
};

export default BbbvaIcon;

import React from 'react';
import bbva from '../images/banks/bbva.png'
import Image from 'next/image';

const BbbvaIcon = () => {
  return (
    <Image src={bbva} alt="BBVA" width={35} height={35}/>
  );
};

export default BbbvaIcon;

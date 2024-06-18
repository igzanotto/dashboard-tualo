import Image from "next/image";
import React from "react";
import logo from './logo.svg'

const Logo = () => {
  return (
    <Image width={80} height={80} src={logo} alt="logo"/>
  );
};

export default Logo;

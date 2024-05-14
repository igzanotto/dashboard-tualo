import Image from "next/image";
import logo from './logo.svg'

const LogoScrolled = () => {
  return (
    <Image className="bg-gradient-to-r from-[#4C30C5] to-[#39AEFF] rounded-xl" width={70} height={70} src={logo} alt="logo"/>
  )
}

export default LogoScrolled
import Image from "next/image";
import logo from './logo.svg'

const LogoScrolled = () => {
  return (
    <Image className="bg-gradient-to-r from-[#0065A1] to-[#00AE8D] rounded-xl" width={70} height={70} src={logo} alt="logo"/>
  )
}

export default LogoScrolled
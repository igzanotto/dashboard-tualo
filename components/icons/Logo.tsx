import Image from "next/image";
import logo from './logo.svg'

const Logo = () => {
  return (
    <Image width={60} height={60} src={logo} alt="logo"/>
  )
}

export default Logo
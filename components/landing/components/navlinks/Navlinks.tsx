import Link from "next/link";

interface Props {
    path:string;
    text:string;
    className: string
    // onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Navlinks = ({path, text, className}:Props) => {
  // const [activeLink, setActiveLink] = useState(false);

//   const pathName = usePathname()  


  return (
    <Link href={path} className={className}>
      {text}                    
    </Link>
  )
}
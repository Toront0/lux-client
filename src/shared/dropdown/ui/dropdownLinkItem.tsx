import { Link } from "react-router-dom";

interface IDropdownLinkItem {
  children: React.ReactNode;
  href: string;
}

const DropdownLinkItem = ({ children, href }: IDropdownLinkItem) => {
  return (
    <Link to={href} className="w-full flex gap-2">
      {children}
    </Link>
  );
};

export default DropdownLinkItem;

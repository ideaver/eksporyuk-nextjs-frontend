import { checkIsActive } from "@/_metronic/helpers";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
  className?: string;
  children: React.ReactNode;
  to: string;
}

export const NavLink = ({ children, className, to }: NavLinkProps) => {
  const { asPath } = useRouter();
  const isActive = checkIsActive(asPath, to);
  console.log("AsPath", asPath)
  console.log("TO",to)
console.log("ISACTIVE", isActive)
  return (
    <Link
      className={clsx(`nav-link text-active-primary me-6 ${className}`, {
        active: isActive,
      })}
      href={to}
    >
      {children}
    </Link>
  );
};

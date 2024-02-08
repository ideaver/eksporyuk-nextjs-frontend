import { NavLink } from "@/stories/molecules/Links/NavLink";
import clsx from "clsx";

interface Link {
  label: string;
  to: string;
}

interface TabLink {
  className?: string;
  links: Link[];
}

export const TabLink = ({ className, links }: TabLink) => {
  return (
    <div className={clsx("d-flex overflow-auto h-55px ", className)}>
      <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
        {links.map((link, index) => (
          <li className="nav-item" key={index}>
            <NavLink to={link.to}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

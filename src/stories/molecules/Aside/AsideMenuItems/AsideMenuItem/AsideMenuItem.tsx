import { FC } from "react";
import clsx from "clsx";
import { checkIsActive, KTIcon, WithChildren } from "@/_metronic/helpers";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  to: string;
  title: string;
  icon?: string;
  hasBullet?: boolean;
};

const AsideMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  hasBullet = false,
}) => {
  const { pathname } = useRouter();
  const isActive = checkIsActive(pathname, to);
  // console.log("INI IS ACTIVE at AsideMenuItem with pathname", pathname, isActive, to)
  return (
    <div className="menu-item">
      <Link
        className={clsx("menu-link without-sub", { active: isActive })}
        href={to}
      >
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}
        {icon && (
          <span className="menu-icon">
            <KTIcon iconName={icon} className="fs-2" />
          </span>
        )}
        <span className="menu-title">{title}</span>
      </Link>
      {children}
    </div>
  );
};

export { AsideMenuItem };

import { FC } from "react";
import clsx from "clsx";
import { checkIsActive, KTIcon, WithChildren } from "@/_metronic/helpers";
import { useRouter } from "next/router";
import Link from "next/link";
import { StringifyOptions } from "querystring";

type Props = {
  to: string
  title: string
  icon?: string
  hasBullet?: boolean
}

const AsideMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  hasBullet,
}) => {
  const {pathname} = useRouter()
  const isActive = checkIsActive(pathname, to)
  // console.log("INI IS ACTIVE at AsideMenuItemWithSub with pathname", pathname, isActive, to)
  return (
    <div
      className={clsx('menu-item', {'here show': isActive}, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && (
          <span className='menu-icon'>
            <KTIcon iconName={icon} className='fs-2' />
          </span>
        )}
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', {'menu-active-bg': isActive})}>
        {children}
      </div>
    </div>
  )
}

export {AsideMenuItemWithSub}

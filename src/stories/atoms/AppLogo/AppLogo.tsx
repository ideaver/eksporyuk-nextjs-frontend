import React from "react";
import clsx from "clsx";
import { KTIcon } from "../../../_metronic/helpers";
import Link from "next/dist/client/link";
import Image from "next/image";

interface AppLogoProps {
  /**
   *  ClassNames for custom styles
   */
  classNames?: string;
  /**
   * Optional click handler
   */
  urlPath?: string;
}

/**
 * AppLogo Atom for user interaction
 */
export const AppLogo = ({ classNames, urlPath = "/" }: AppLogoProps) => {
  return (
    <Link href={urlPath} className={classNames}>
      <img
        alt="Logo"
        src={"./images/logo/EksporYukLogo.png"}
        className="h-75px"
      />
    </Link>
  );
};

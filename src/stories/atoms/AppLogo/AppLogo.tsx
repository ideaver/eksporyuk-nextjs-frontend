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
   *  Sizing
   */
  size?: "small" | "medium" | "large";
  /**
   * Optional click handler
   */
  urlPath?: string;
  /**
   * App Logo Type
   */
  type?: "default" | "white";
}

/**
 * AppLogo Atom for user interaction
 */
export const AppLogo = ({
  classNames,
  urlPath = "/",
  size,
  type = "default",
}: AppLogoProps) => {
  const sizeHandler = (size: string | undefined) => {
    switch (size) {
      case "small":
        return "h-30px";
      case "medium":
        return "h-40px";
      case "large":
        return "h-50px";
      default:
        return "h-75px";
    }
  };
  return (
    <Link href={urlPath}>
      <img
        alt="Logo"
        src={`./images/logo/${
          type === "default" ? "EksporYukLogo.png" : "logo-white.png"
        }`}
        className={clsx(sizeHandler(size), classNames)}
      />
    </Link>
  );
};
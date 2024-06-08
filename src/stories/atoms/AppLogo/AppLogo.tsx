import clsx from "clsx";
import Link from "next/dist/client/link";

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
   * Optional click handler
   */
  customUrlLogo?: string;
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
  customUrlLogo,
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
        src={customUrlLogo ?? `./images/logo/${
          type === "default" ? "EksporYukLogo.png" : "logo-white.png"
        }`}
        className={clsx(sizeHandler(size), classNames)}
      />
    </Link>
  );
};

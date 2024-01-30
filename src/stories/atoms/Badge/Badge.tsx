import React from "react";
import clsx from "clsx";
import { KTIcon } from "../../../_metronic/helpers";

interface BadgeProps {
  /**
   *  ClassNames for custom styles
   */
  classNames?: string;
  /**
   * Badge Type
   */
  lightBadge?: boolean;
  /**
   * What badge color to use
   */
  badgeColor:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Icon Name for show Icon
   */
  icon?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Badge component for user interaction
 */
export const Badge = ({
  lightBadge = true,
  size = "medium",
  badgeColor = "primary",
  label,
  icon,
  classNames,
  ...props
}: BadgeProps) => {
  const isLightBadge = lightBadge ? "badge-light" : "badge";
  const badgeSize =
    size === "medium" ? "fs-7" : size === "large" ? "fs-6" : "fs-8";
  return (
    <span
      className={clsx(classNames,
        `badge ${isLightBadge}-${badgeColor} ${badgeSize}`,
        "fw-bold my-2"
      )}
      {...props}
    >
      {label}
      {icon && (
        <KTIcon
          iconName={icon}
          className={`svg-icon svg-icon-${badgeColor} ms-3`}
        />
      )}
    </span>
  );
};

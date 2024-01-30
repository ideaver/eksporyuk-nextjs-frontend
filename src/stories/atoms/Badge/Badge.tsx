import React from "react";
import styles from "./Badge.module.sass";
import clsx from "clsx";

interface BadgeProps {
  /**
   * What background color to use
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
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Badge = ({
  size = "medium",
  badgeColor = "primary",
  label,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={clsx(`badge badge-light-${badgeColor}`, "fs-8 fw-bold my-2")}
      {...props}
    >
      {label}
    </span>
  );
};

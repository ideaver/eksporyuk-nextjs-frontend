import React from "react";
import clsx from "clsx";
import { KTIcon } from "../../../_metronic/helpers";

interface IndicatorBadgeProps {
  /**
   * Badge Type
   */
  lightBadge?: boolean;
  /**
   * What badge color to use
   */
  badgeColor:
    | "success"
    | "danger";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Indicator for up or down
   */
  indicator?: "up" | "down";
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const IndicatorBadge = ({
  lightBadge = true,
  size = "medium",
  badgeColor = "success",
  label,
  indicator = "up",
  ...props
}: IndicatorBadgeProps) => {
  const isLightBadge = lightBadge ? "badge-light" : "badge";
  const badgeSize =
    size === "medium" ? "fs-7" : size === "large" ? "fs-6" : "fs-8";
    const indicatorIcon = indicator === "up" ? "arrow-up" : "arrow-down";
  return (
    <span
      className={clsx(
        `badge ${isLightBadge}-${badgeColor} ${badgeSize}`,
        "fw-bold my-2"
      )}
      {...props}
    >
        <KTIcon
          iconName={indicatorIcon}
          className={`svg-icon svg-icon-${lightBadge ? badgeColor : 'light'} me-1`}
        />
      {label} %
    </span>
  );
};

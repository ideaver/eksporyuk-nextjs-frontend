import React from "react";
import clsx from "clsx";
import { KTIcon } from "@/_metronic/helpers";

interface ButtonsProps {
  /**
   *  ClassNames for custom styles
   */
  classNames?: string;
  /**
   * Button Mode
   */
  mode?: "normal" | "light" | "link";
  /**
   * Button Type
   */
  type?: "submit" | "reset" | "button";
  /**
   * Create Button with circle style, only works with Icon Button (no label)
   */
  circleButton?: boolean;
  /**
   * Show Label or not
   */
  showLabel?: boolean;
  /**
   * Show Icon or not
   */
  showIcon?: boolean;
  /**
   * What badge color to use
   */
  buttonColor?:
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
   * Button Icon name
   */
  icon?: string;
  /**
   * Disabled Button
   */
  disabled?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Buttons Molecule Component
 */
export const Buttons = ({
  mode = "normal",
  type = "button",
  size = "medium",
  buttonColor = "primary",
  icon = "plus-square",
  showIcon = false,
  showLabel = true,
  circleButton = false,
  label,
  disabled,
  classNames,
  ...props
}: ButtonsProps) => {
  const btnSizeHandle = (size: string): string => {
    switch (size) {
      case "small":
        return "btn-sm";
      case "medium":
        return "btn-md";
      case "large":
        return "btn-lg";
      default:
        return "btn-md";
    }
  };

  const btnModeHandler = (btnMode: string, buttonColor: string): string => {
    switch (btnMode) {
      case "normal":
        return `btn-${buttonColor}`;
      case "light":
        return `btn-light-${buttonColor}`;
      case "link":
        return `btn-link btn-color-${buttonColor} btn-active-color-primary`;
      default:
        return `btn-${buttonColor}`;
    }
  };

  const btnTypeHandler = (
    showIcon: boolean,
    showLabel: boolean,
    circleButton: boolean
  ): string => {
    if (showIcon && !showLabel && circleButton) {
      return "btn-icon btn-circle";
    }
    if (showIcon && !showLabel) {
      return "btn-icon";
    }
    return "";
  };

  return (
    <button
    disabled={disabled}
      type={type}
      className={clsx(
        classNames,
        "btn",
        btnTypeHandler(showIcon, showLabel, circleButton),
        btnModeHandler(mode, buttonColor),
        btnSizeHandle(size)
      )}
      {...props}
    >
      {showIcon && (
        <KTIcon
          iconName={icon}
          className={`svg-icon fs-1 ${showLabel && "me-1"}`}
        />
      )}
      {showLabel && label}
    </button>
  );
};

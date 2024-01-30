import React from "react";
import clsx from "clsx";
import { KTIcon } from "../../../_metronic/helpers";
import { Buttons } from "../Buttons/Buttons";
import Link from "next/link";

interface AlertProps {
  /**
   *  ClassNames for custom styles
   */
  classNames?: string;
  /**
   * Alert Type
   */
  mode?: "normal" | "light";
  /**
   * Alert Border Type
   */
  border?: "no border" | "primary" | "dashed";
  /**
   * Create Dismissable Alert with close button
   */
  dismissable?: boolean;
  /**
   * What badge color to use
   */
  alertColor:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark";
  /**
   * Alert Title
   */
  title: string;
  /**
   * Alert contents
   */
  label: string;
  /**
   * Prefix Alert Icon name
   */
  prefixIcon?: string;
  /**
   * Create Alert With Button
   */
  showAlertButton?: boolean;
  /**
   * Mark Alert as new alert
   */
  newAlert?: boolean;
  /**
   * Show Clickable link for Alert
   */
  linkAlert?: string;
  /**
   * Link Content for Alert
   */
  linkLabel?: string;
  /**
   * Alert Button Content
   */
  buttonLabel?: string;
  /**
   * Optional click handler
   */
  onAlertButtonClick?: () => void;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Alert Molecule Component
 */
export const Alert = ({
  mode = "normal",
  alertColor = "primary",
  prefixIcon = "shield-cross",
  showAlertButton = false,
  border = "no border",
  dismissable = false,
  label,
  title,
  buttonLabel = "Enable",
  classNames,
  onAlertButtonClick,
  newAlert,
  linkAlert,
  linkLabel = "Learn More",
  ...props
}: AlertProps) => {
  const alertModeHandler = (alertMode: string, alertColor: string): string => {
    switch (alertMode) {
      case "normal":
        return `bg-${alertColor}`;
      case "light":
        return `alert-${alertColor}`;
      default:
        return `bg-${alertColor}`;
    }
  };
  const alertIconHandler = (alertMode: string, alertColor: string): string => {
    switch (alertMode) {
      case "normal":
        return `svg-icon-light`;
      case "light":
        return `svg-icon-${alertColor}`;
      default:
        return `svg-icon-${alertColor}`;
    }
  };

  const borderHandler = (border: string, alertColor: string): string => {
    switch (border) {
      case "no border":
        return "";
      case "primary":
        return `border-${alertColor}`;
      case "dashed":
        return `border-${alertColor} border-dashed`;
      default:
        return "";
    }
  };

  return (
    <div
      className={clsx(
        classNames,
        "alert d-flex align-items-center p-5 mb-10 border",
        borderHandler(border, alertColor),
        alertModeHandler(mode, alertColor),
        dismissable && "alert-dismissible"
      )}
    >
      <KTIcon
        iconName={prefixIcon}
        className={clsx(
          "svg-icon fs-2hx me-3",
          alertIconHandler(mode, alertColor)
        )}
      />

      <div className="d-flex flex-column">
        <h5 className={clsx("mb-1", mode === "normal" ? "text-light" : "")}>
          {title}
        </h5>
        <span className={clsx(mode === "normal" ? "text-light" : "")}>
          {label}
        </span>
        {linkAlert && (
          <Link href={linkAlert} className={clsx("fw-bold", mode === "normal" && alertColor == "primary" ? "text-light" : "text-primary ")}>
            {linkLabel}
          </Link>
        )}
      </div>
      {dismissable && (
        <button
          type="button"
          className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
          data-bs-dismiss="alert"
        >
          <KTIcon
            iconName={"cross"}
            className={clsx(
              "svg-icon fs-2hx ms-3",
              alertIconHandler(mode, alertColor)
            )}
          />
        </button>
      )}
      {showAlertButton && (
        <Buttons
          onClick={onAlertButtonClick}
          label={buttonLabel}
          showIcon={false}
          buttonColor={alertColor}
          classNames="ms-5"
        />
      )}
      {newAlert && <span className="ms-5 fw-bold">New</span>}
    </div>
  );
};

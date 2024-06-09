import React from "react";
import clsx from "clsx";
import { KTIcon } from "@/_metronic/helpers";

interface TextareaProps {
  /**
   *  ClassNames for custom styles
   */
  classNames?: string;
  /**
   * Input Style Type
   */
  styleType?: "outline" | "solid" | "white";
  /**
   * Input State
   */
  disabled?: boolean;
  /**
   * create Suffix Icon for Input
   */
  suffixIcon?: string;
  /**
   * handle Suffix Icon on click
   */
  onClickSuffixIcon?: () => void;
  /**
   * handle Suffix Icon hover clickable
   */
  clickableSuffixIcon?: boolean;
  /**
   * Preffix Icon tooltp for hover
   */
  suffixIconTooltip?: string;
  /**
   * Create Preffix Icon for Input
   */
  preffixIcon?: string;
  /**
   * handle Preffix Icon on click
   */
  onClickPreffixIcon?: () => void;
  /**
   * handle Preffix Icon hover clickable
   */
  clickablePreffixIcon?: boolean;
  /**
   * Preffix Icon tooltp for hover
   */
  preffixIconTooltip?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Input Placeholder
   */
  placeholder?: string;
  /**
   * Props for Input
   */
  props?: any;
  rows?: number
}

/**
 * Textarea Molecule Component
 */
export const Textarea = ({
  styleType = "outline",
  size = "medium",
  disabled = false,
  suffixIcon,
  preffixIcon,
  placeholder = "Type Here...",
  onClickPreffixIcon,
  onClickSuffixIcon,
  clickablePreffixIcon = false,
  clickableSuffixIcon = true,
  preffixIconTooltip,
  suffixIconTooltip,
  classNames,
  props,
  rows,
}: TextareaProps) => {
  const inputSizeHandler = (size: string): string => {
    switch (size) {
      case "small":
        return "form-control-sm";
      case "medium":
        return "form-control-md";
      case "large":
        return "form-control-lg";
      default:
        return "form-control-md";
    }
  };
  const inputStyleHandler = (styleType: string): string => {
    switch (styleType) {
      case "outline":
        return "form-control";
      case "solid":
        return "form-control-solid";
      case "white":
        return "form-control-white border-0";
      default:
        return "form-control";
    }
  };

  return (
    <div className="w-100 position-relative">
      {preffixIcon && (
        <div
          className="position-absolute top-50 start-0 translate-middle-y ms-5"
          data-kt-search-element="toolbar"
        >
          <div
            data-kt-search-element={`${preffixIconTooltip?.replace(
              " ",
              "-"
            )}-show`}
            className={clsx(
              `w-20px btn-sm me-1`,
              disabled !== true && clickablePreffixIcon
                ? "btn btn-icon btn-active-color-primary"
                : ""
            )}
            data-bs-toggle="tooltip"
            onClick={onClickPreffixIcon}
            title={preffixIconTooltip}
          >
            <KTIcon iconName={preffixIcon} className="fs-2 text-lg-1" />
          </div>
        </div>
      )}

      <textarea
        className={clsx(
          `form-control ${inputStyleHandler(styleType)} ${inputSizeHandler(
            size
          )}`,
          preffixIcon && "ps-15",
          suffixIcon && "pe-15",
          classNames
        )}
        id="field"
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        {...props}
      />

      {suffixIcon && (
        <div
          className="position-absolute top-50 end-0 translate-middle-y me-5"
          data-kt-search-element="toolbar"
        >
          <div
            data-kt-search-element={`${suffixIconTooltip?.replace(
              " ",
              "-"
            )}-show`}
            className={clsx(
              `w-20px btn-sm me-1`,
              disabled !== true && clickableSuffixIcon
                ? "btn btn-icon btn-active-color-primary"
                : ""
            )}
            data-bs-toggle="tooltip"
            onClick={onClickSuffixIcon}
            title={suffixIconTooltip}
          >
            <KTIcon iconName={suffixIcon} className="fs-2 text-lg-1" />
          </div>
        </div>
      )}
    </div>
  );
};

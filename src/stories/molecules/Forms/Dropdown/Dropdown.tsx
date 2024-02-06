import clsx from "clsx";
import { useState } from "react";

interface DropdownProps {
  /**
   * All Options that will shown at Dropdown
   */
  options: { value: string | number; label: string }[];
  /**
   * Callback Function if value changed
   */
  onValueChange: (value: string | number) => void;
  /**
   * How large should the dropdown be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Dropdown Style Type
   */
  styleType?: "outline" | "solid" | "white";
  /**
   * Dropdown State
   */
  disabled?: boolean;
  /**
   * Props for Dropdown
   */
  props?: any;
  /**
   * Aria Label for Dropdown
   */
  ariaLabel?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onValueChange,
  size = "medium",
  styleType = "outline",
  disabled,
  props,
  ariaLabel,
}) => {
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onValueChange(value);
  };

  const dropdownSizeHandler = (size: string): string => {
    switch (size) {
      case "small":
        return "form-select-sm";
      case "medium":
        return "form-select-md";
      case "large":
        return "form-select-lg";
      default:
        return "form-select-md";
    }
  };

  const dropdownStyleHandler = (styleType: string): string => {
    switch (styleType) {
      case "outline":
        return "form-select";
      case "solid":
        return "form-select-solid";
      case "white":
        return "form-select-white border-0";
      default:
        return "form-select";
    }
  };

  return (
    <select
      className={clsx(
        "form-select",
        dropdownSizeHandler(size),
        dropdownStyleHandler(styleType)
      )}
      aria-label={ariaLabel}
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled}
      {...props}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

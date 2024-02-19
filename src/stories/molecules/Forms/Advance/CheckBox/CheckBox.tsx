import clsx from "clsx";

interface CheckBoxInputProps {
  name: string;
  value: string;
  children: React.ReactNode;
  className?: string;
  defaultChildren?: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBoxInput = ({
  name,
  value,
  children,
  className,
  defaultChildren = true,
  checked,
  onChange,
}: CheckBoxInputProps) => {
  return (
    <label
      className={clsx(
        "w-100 d-flex flex-stack text-start",
        className
      )}
    >
      <div className="d-flex align-items-start">
        <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
          <input
            className="form-check-input p-6"
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
          />
        </div>
        <div className="flex-grow-1">
          {defaultChildren ? (
            <h2 className="d-flex align-items-center fs-3 fw-bold py-2 text-gray-700 flex-wrap">
              {children}
            </h2>
          ) : (
            children
          )}
        </div>
      </div>
    </label>
  );
};
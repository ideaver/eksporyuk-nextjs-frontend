import clsx from "clsx";

interface RadioInputProps {
  name: string;
  value: string;
  children: React.ReactNode;
  className?: string;
  defaultChildren?: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioInput = ({
  name,
  value,
  children,
  className,
  defaultChildren = true,
  checked,
  onChange,
}: RadioInputProps) => {
  return (
    <label
      className={clsx(
        "w-100 btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-6 mb-5 ",
        className
      )}
    >
      <div className="d-flex align-items-center me-2">
        <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
          />
        </div>
        <div className="flex-grow-1">
          {defaultChildren ? (
            <h2 className="d-flex align-items-center fs-3 fw-bold flex-wrap">
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
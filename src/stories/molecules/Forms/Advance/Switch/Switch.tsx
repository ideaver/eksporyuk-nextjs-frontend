import clsx from "clsx";

interface SwitchProps {
    name: string;
    value: string;
    children: React.ReactNode;
    className?: string;
    defaultChildren?: boolean;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
    name,
    value,
    children,
    className,
    defaultChildren = true,
    checked,
    onChange,
}: SwitchProps) => {
    return (
        <label
            className={clsx(
                "w-100 d-flex flex-stack text-start",
                className
            )}
        >
            <div className="d-flex me-2">
                <div className="form-check form-switch form-check-custom form-check-solid form-check-primary me-6">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                    />
                </div>
                <div className="flex-grow-1">
                    {defaultChildren ? (
                        <h2 className="align-middle mt-2 fs-3 fw-bold">
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
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import s from "./ui.module.scss";
import clsx from "clsx";

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  type = "button",
  disabled = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={clsx(s.button, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import s from "./ui.module.scss";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  type?: "button" | "reset" | "submit";
  props?: DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  type = "button",
  className,
  children,
  ...props
}) => {
  return (
    <button type={type} className={clsx(s.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;

import { ReactNode } from "react";
import Link from "next/link";

export const AuthButton = ({
  children,
  ...buttonProps
}: {
  children?: ReactNode;
  [key: string]: any;
}) => {
  const Component = "href" in buttonProps ? Link : "button";
  return (
    // @ts-ignore
    <Component
      className={
        "rounded-full bg-sky-700 p-3 w-4/5  font-rem text-3xl text-center text-color-white"
      }
      {...buttonProps}
    >
      {children}
    </Component>
  );
};

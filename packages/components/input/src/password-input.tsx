import { forwardRef, useState } from "react";
import BaseInput, { BaseInputProps } from "./base-input";
import { Button, ButtonProps } from "@gist-ui/button";
import { Icon } from "@gist-ui/icon";

export interface PasswordInputProps extends Omit<BaseInputProps, "type"> {
  endContentPosition?: "left" | "right";
  hideToggleButton?: boolean;
  toggleButtonProps?: ButtonProps;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [show, setShow] = useState(false);

  const {
    endContent,
    endContentPosition = "left",
    hideToggleButton,
    toggleButtonProps,
    ...rest
  } = props;

  return (
    <BaseInput
      ref={ref}
      {...rest}
      type={show ? "text" : "password"}
      endContent={
        <>
          {endContentPosition === "left" && endContent}
          {!hideToggleButton && (
            <Button
              isIconOnly
              size="sm"
              rounded="full"
              variant="text"
              {...toggleButtonProps}
              onPress={(e) => {
                toggleButtonProps?.onPress?.(e);
                setShow((p) => !p);
              }}
            >
              {show ? (
                <Icon size="sm">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Icon>
              ) : (
                <Icon size="sm">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 14"
                  >
                    <g
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                    </g>
                  </svg>
                </Icon>
              )}
            </Button>
          )}
          {endContentPosition === "right" && endContent}
        </>
      }
    />
  );
});

PasswordInput.displayName = "gist-ui.PasswordInput";

export default PasswordInput;

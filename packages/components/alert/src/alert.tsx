import { forwardRef } from 'react';
import { AlertVariantProps, alert as alertStyles } from '@gist-ui/theme';

const success = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
  >
    <g fill="currentColor">
      <path d="M10.5 15.25A.74.74 0 0110 15l-3-3a.75.75 0 011-1l2.47 2.47L19 5a.75.75 0 011 1l-9 9a.74.74 0 01-.5.25z"></path>
      <path d="M12 21a9 9 0 01-7.87-4.66 8.67 8.67 0 01-1.07-3.41 9 9 0 014.6-8.81 8.67 8.67 0 013.41-1.07 8.86 8.86 0 013.55.34.75.75 0 11-.43 1.43 7.62 7.62 0 00-3-.28 7.5 7.5 0 00-5.04 2.73 7.42 7.42 0 00-1.64 5.51 7.499 7.499 0 002.73 5.04 7.419 7.419 0 005.51 1.64 7.5 7.5 0 005.04-2.73 7.42 7.42 0 001.64-5.51.788.788 0 111.57-.15 9 9 0 01-4.61 8.81A8.67 8.67 0 0112.93 21H12z"></path>
    </g>
  </svg>
);

const info = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 7.01V7m0 10v-7m9 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const warning = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
  >
    <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
      <path d="M12 2.988L22.292 21H1.708L12 2.988zM4.292 19.5h15.416L12 6.012 4.292 19.5z"></path>
      <path d="M11.25 15v-4.5h1.5V15h-1.5zM11.25 17.25v-1.5h1.5v1.5h-1.5z"></path>
    </g>
  </svg>
);

const danger = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
  >
    <g fill="currentColor">
      <path d="M12 6.25a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0V7a.75.75 0 01.75-.75zM12 17a1 1 0 100-2 1 1 0 000 2z"></path>
      <path
        fillRule="evenodd"
        d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12zM12 2.75a9.25 9.25 0 100 18.5 9.25 9.25 0 000-18.5z"
        clipRule="evenodd"
      ></path>
    </g>
  </svg>
);

const icons = {
  success,
  info,
  warning,
  danger,
};

export interface AlertProps extends AlertVariantProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    color,
    fullWidth,
    variant,
    children,
    icon = icons[color || 'danger'],
  } = props;

  const styles = alertStyles({ color, fullWidth, variant });

  return (
    <div role="alert" ref={ref} className={styles}>
      <span>{icon}</span>
      <span>{children}</span>
    </div>
  );
});

Alert.displayName = 'gist-ui.Alert';

export default Alert;

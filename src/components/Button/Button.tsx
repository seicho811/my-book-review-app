import styles from "./Button.module.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "medium" | "large";
  isDisabled?: boolean;
};

export default function Button({
  children,
  size = "medium",
  isDisabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${styles.base} ${styles[size]} ${
        isDisabled && styles.disabled
      }`}
      disabled={isDisabled}
      {...rest}
    >
      {children}
    </button>
  );
}

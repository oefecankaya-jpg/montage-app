import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  children: ReactNode;
  disabled?: boolean;
}

export function AccentButton({ onClick, style, children, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-outline-accent"
      style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontWeight: 600,
        fontSize: 14.5,
        borderRadius: 4,
        padding: "13px 14px",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function NeutralButton({ onClick, style, children, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-outline-neutral"
      style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontWeight: 600,
        fontSize: 13,
        borderRadius: 4,
        padding: "12px 14px",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-herb text-white hover:bg-ink",
  secondary: "border border-line bg-white text-ink hover:border-herb hover:text-herb",
  ghost: "text-slate-600 hover:bg-mint hover:text-herb",
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

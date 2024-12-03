import { forwardRef } from "react";

interface ButtonProps {
    text?: string;
    onClickFn?: () => void;
    className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text = "Submit", onClickFn = () => {}, className = "" }, ref) => {
        return (
            <button
                ref={ref}
                onClick={onClickFn}
                className={`px-4 py-2 bg-emerald-500 text-white font-bold rounded hover:bg-emerald-700 transition ${className}`}
            >
                {text}
            </button>
        );
    }
);

Button.displayName = "Button"; // Required for forwardRef components like swiper

export default Button;
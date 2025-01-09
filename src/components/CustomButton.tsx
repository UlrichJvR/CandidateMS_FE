// ButtonWithSpinner.tsx
import React from "react";

interface ButtonWithSpinnerProps {
  loading: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  text: string;
}

const CustomButton: React.FC<ButtonWithSpinnerProps> = ({
  loading,
  onClick,
  text,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={loading} // Disable the button while loading
    >
      {loading ? (
        <svg
          className="animate-spin w-5 h-5 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0116 0"
          ></path>
        </svg>
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;

import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ label, onClick, className = '', type = "button" }: ButtonProps) => (
  <button
    onClick={onClick}
    type={type}
    className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${className}`}
  >
    {label}
  </button>
);

export default Button;

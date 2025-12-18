import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  placeholder = 'Enter text',
  type = 'text',
  ...props
}) => {
  return (
    <input
      className={`w-full rounded border-2 px-4 py-2 shadow-md transition focus:shadow-xs focus:outline-hidden ${
        props['aria-invalid']
          ? 'border-destructive text-destructive shadow-destructive shadow-xs'
          : ''
      } ${className}`}
      placeholder={placeholder}
      type={type}
      {...props}
    />
  );
};

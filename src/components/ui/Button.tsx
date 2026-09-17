import { ButtonHTMLAttributes } from 'react';
import { ButtonVariant } from '../../types';
import { buttonClassName } from '../../lib/buttonStyles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => {
  return <button className={`${buttonClassName(variant)} ${className}`.trim()} {...props} />;
};

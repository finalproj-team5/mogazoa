'use client';

import * as React from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import EyeIcon from '@/assets/icons/Eye.svg';
import EyeOffIcon from '@/assets/icons/EyeOff.svg';

const inputVariants = cva(
  'flex w-full min-w-0 rounded-lg bg-[#252530] px-3 outline-none placeholder:text-muted-foreground text-[#F1F1F5] transition-[color,box-shadow]',
  {
    variants: {
      variant: {
        default:
          'border border-[#353542] hover:border-[#5097FA] focus-visible:border-[#5097FA] focus-visible:ring-[#5097FA]',
        error:
          'border border-[#FF0000] focus-visible:border-[#FF0000] focus-visible:ring-[#FF0000]',
      },
      size: {
        sm: 'h-[55px] w-[335px] py-3 text-sm font-normal placeholder:text-sm placeholder:font-normal',
        md: 'h-[55px] w-[440px] py-3 text-sm font-normal placeholder:text-sm placeholder:font-normal',
        lg: 'h-[70px] w-[640px] py-4 text-base font-normal placeholder:text-base placeholder:font-normal',
        'product-sm':
          'h-[55px] w-[335px] py-3 text-sm font-normal placeholder:text-sm placeholder:font-normal',
        'product-md':
          'h-[60px] w-[360px] py-3 text-sm font-normal placeholder:text-sm placeholder:font-normal',
        'product-lg':
          'h-[70px] w-[400px] py-4 text-base font-normal placeholder:text-base placeholder:font-normal',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, label, helperText, errorMessage, ...props }, ref) => {
    const isError = variant === 'error' || !!errorMessage;
    const isPassword = type === 'password';
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const getIconSize = () => {
      return size === 'lg' ? { width: 24, height: 24 } : { width: 22, height: 22 };
    };

    return (
      <div className='space-y-2'>
        {label && (
          <label
            className={cn(
              'font-normal text-[#F1F1F5] mb-[10px] block',
              size === 'lg' ? 'text-base' : 'text-sm',
            )}
          >
            {label}
          </label>
        )}
        <div className='relative w-fit'>
          <input
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            data-slot='input'
            className={cn(
              inputVariants({
                variant: isError ? 'error' : variant,
                size,
                className,
              }),
              isPassword && 'pr-12',
            )}
            ref={ref}
            aria-invalid={isError}
            {...props}
          />
          {isPassword && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
            >
              {showPassword ? (
                <Image src={EyeIcon} alt='Hide password' {...getIconSize()} />
              ) : (
                <Image src={EyeOffIcon} alt='Show password' {...getIconSize()} />
              )}
            </button>
          )}
        </div>
        {(helperText || errorMessage) && (
          <p
            className={cn(
              'text-sm mt-[10px]',
              isError ? 'text-destructive' : 'text-muted-foreground',
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg',
  {
    variants: {
      variant: {
        primary: [
          // 그라데이션 배경
          'bg-gradient-to-r from-[#5097FA] to-[#5363FF]',
          'text-[#F1F1F5]',
          'hover:from-[#4086E9] hover:to-[#4252EE]',
          'active:from-[#3075D8] active:to-[#3141DD]',
          'focus-visible:ring-blue-500',
          'disabled:bg-[#353542] disabled:text-[#6E6E82] disabled:from-[#353542] disabled:to-[#353542]',
        ],
        secondary: [
          // 투명 배경 (배경색 없음)
          'bg-transparent',
          'border border-transparent',
          'hover:bg-[#9FA6B2]/10',
          'active:scale-[0.98]',
          'focus-visible:ring-blue-500',
          'disabled:bg-transparent disabled:text-[#353542] disabled:border-[#353542] disabled:hover:scale-100',
        ],
        tertiary: [
          'bg-transparent',
          'border border-[#9FA6B2]',
          'text-[#9FA6B2]',
          'hover:bg-[#9FA6B2]/10',
          'focus-visible:ring-gray-400',
          'disabled:border-[#353542] disabled:text-[#353542]',
        ],
      },
      size: {
        lg: 'w-[640px] h-[65px] text-lg', // 18px
        md: 'w-[440px] h-[55px] text-base', // 16px
        sm: 'w-[335px] h-[50px] text-base', // 16px
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, children, ...props }, ref) => {
    if (variant === 'secondary') {
      return (
        <div className='relative inline-block'>
          {/* Secondary variant를 위한 그라데이션 테두리 (disabled가 아닐 때만) */}
          {!disabled && (
            <div
              className='absolute inset-0 rounded-lg p-[1px]'
              style={{
                background: 'linear-gradient(to right, #5097FA, #5363FF)',
              }}
            >
              {/* 현재 페이지 배경색과 맞춰서 안쪽을 채움 */}
              <div className='h-full w-full rounded-lg bg-[#1C1C22]' />
            </div>
          )}

          <button
            className={cn(
              buttonVariants({ variant, size }),
              // disabled가 아닐 때만 border 제거 (그라데이션 div가 테두리 역할)
              !disabled && 'border-none relative z-10',
              className,
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          >
            {/* Secondary variant를 위한 그라데이션 텍스트 (disabled가 아닐 때만) */}
            <span
              className={cn(
                !disabled &&
                  'bg-gradient-to-r from-[#5097FA] to-[#5363FF] bg-clip-text text-transparent',
              )}
            >
              {children}
            </span>
          </button>
        </div>
      );
    }

    // Primary, Tertiary variant는 기본 처리
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };

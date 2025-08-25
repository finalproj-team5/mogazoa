'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex w-full rounded-lg bg-[#252530] px-3 py-3 outline-none placeholder:text-muted-foreground text-[#F1F1F5] transition-[color,box-shadow] resize-none border',
  {
    variants: {
      variant: {
        default:
          'border-[#353542] hover:border-[#5097FA] focus-visible:border-[#5097FA] focus-visible:ring-[#5097FA]',
        error: 'border-[#FF0000] focus-visible:border-[#FF0000] focus-visible:ring-[#FF0000]',
      },
      size: {
        sm: 'h-[120px] w-[295px] text-sm font-normal placeholder:text-sm placeholder:font-normal',
        md: 'h-[160px] w-[510px] text-sm font-normal placeholder:text-sm placeholder:font-normal',
        lg: 'h-[160px] w-[540px] text-base font-normal placeholder:text-base placeholder:font-normal',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface TextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'size'>,
    VariantProps<typeof textareaVariants> {
  maxLength?: number;
  showCharCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      maxLength = 300,
      showCharCount = true,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = React.useState('');
    const charCount = value.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= maxLength) {
        setValue(newValue);
        props.onChange?.(e);
      }
    };

    return (
      <div className='relative w-fit'>
        <textarea
          data-slot='textarea'
          className={cn(textareaVariants({ variant, size, className }))}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {showCharCount && (
          <div className='absolute bottom-3 right-3 pointer-events-none'>
            <span className='text-sm font-normal text-[#6E6E82]'>
              {charCount}/{maxLength}
            </span>
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };

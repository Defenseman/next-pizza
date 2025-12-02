import React from 'react';
import { Button } from '../ui';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'lg';
  type?: 'minus' | 'plus';
}

export const CountIconButton = ({ disabled, onClick, size = 'sm', type }: Props) => {
  return (
    <Button
      type='button'
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 'sm'
          ? 'w-[30px] h-[30px] rounded-[10px]'
          : 'w-[38px] h-[38px] rounded-md'
      )}
    >
      {type === 'plus' ? (
        <Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
      ) : (
        <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
      )}
    </Button>
  );
};

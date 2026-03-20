import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import { classMixin } from '../lib/class-utils';

interface SelectProps {
  defaultValue: string;
  values: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
  onChange: (value: string) => void;
  trigger: React.ReactNode;
}

export function Select({
  defaultValue,
  values,
  open,
  setOpen,
  onChange,
  trigger,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={onChange}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectPrimitive.Trigger asChild>{trigger}</SelectPrimitive.Trigger>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={5}
        className="z-50 max-h-[300px] overflow-hidden"
      >
        <SelectPrimitive.Viewport className="rounded-lg border border-(--d-admin-surface-border) bg-(--d-admin-surface-section) p-2 text-(--d-admin-text-color) shadow-lg">
          <SelectPrimitive.Group>
            {values.map((value, index) => (
              <SelectPrimitive.Item
                key={index}
                value={value}
                className={classMixin(
                  'relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-(--d-admin-text-color)',
                  'cursor-pointer select-none hover:bg-(--d-admin-surface-hover) focus:bg-(--d-admin-surface-hover) focus:outline-none',
                )}
              >
                <SelectPrimitive.ItemText>{value}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
}

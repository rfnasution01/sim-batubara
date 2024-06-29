/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import { Input } from '.'
import { ReactNode } from 'react'

export function FormLabelRadio({
  form,
  label,
  name,
  className,
  isDisabled,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  name: string
  className?: string
  isDisabled?: boolean
}) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex w-full flex-col gap-y-8 text-[2rem] ${className}`}
        >
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center gap-x-8">
            <label className="flex items-center gap-x-4">
              <Input
                type="radio"
                value="1"
                checked={field.value === '1'}
                onChange={() => field.onChange('1')}
                disabled={isDisabled}
              />
              Ya
            </label>
            <label className="flex items-center gap-x-4">
              <Input
                type="radio"
                value="0"
                checked={field.value === '0'}
                onChange={() => field.onChange('0')}
                disabled={isDisabled}
              />
              Tidak
            </label>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

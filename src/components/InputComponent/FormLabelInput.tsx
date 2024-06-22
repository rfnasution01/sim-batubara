/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import { Input } from '.'
import { ReactNode } from 'react'

export function FormLabelInput({
  form,
  label,
  placeholder = '',
  name,
  prefix,
  suffix,
  type,
  handlerClick,
  className,
  isDisabled,
  isNumber,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  placeholder?: string
  name: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?: 'text' | 'number' | 'password' | 'date' | 'file'
  handlerClick?: () => void
  className?: string
  isDisabled?: boolean
  isNumber?: boolean
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
          <Input
            {...field}
            className="bg-white"
            type={type}
            placeholder={placeholder}
            value={field.value}
            prefix={prefix}
            suffix={suffix}
            handlerClick={handlerClick}
            disabled={isDisabled}
            onInput={(e) => {
              if (isNumber && type === 'text') {
                const inputValue = (e.target as HTMLInputElement).value
                ;(e.target as HTMLInputElement).value = inputValue.replace(
                  /[^\d]/g,
                  '',
                )
                field.onChange((e.target as HTMLInputElement).value)
              }
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

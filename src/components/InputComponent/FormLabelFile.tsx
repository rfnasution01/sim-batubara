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
          <FormLabel htmlFor={type === 'file' ? name : undefined}>
            {label}
          </FormLabel>
          {type === 'file' ? (
            <div className="relative flex items-center gap-4">
              <Input
                {...field}
                className="absolute inset-0 z-50 opacity-0"
                type={type}
                placeholder={placeholder}
                id={name}
                prefix={prefix}
                suffix={suffix}
                handlerClick={handlerClick}
                disabled={isDisabled}
                accept=".pdf"
              />
              <label
                htmlFor={name}
                className="flex items-center gap-24 rounded-lg border border-sim-dark px-24 py-16 text-sim-dark hover:cursor-pointer phones:w-full"
              >
                Upload file
              </label>
              {field?.value && field?.value?.length > 0 && (
                <span className="text-sm ml-4 text-gray-500">
                  {field.value}
                </span>
              )}
            </div>
          ) : (
            <Input
              {...field}
              className="bg-white"
              type={type}
              placeholder={placeholder}
              id={(type as string) === 'file' ? name : undefined}
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
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

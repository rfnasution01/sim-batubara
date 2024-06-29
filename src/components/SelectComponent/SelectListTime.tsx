import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import { cn } from '@/libs/helpers/utils'
import { UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import { customStyles } from '@/libs/variants/SelectProps'

interface inputProps {
  name: string
  placeholder: string
  headerLabel?: string
  isDisabled?: boolean
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: UseFormReturn | any | undefined
  data: {
    value: string
    label: string
  }[]
}

export function SelectListTime({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  form,
  className,
  data,
}: inputProps) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'flex w-full flex-col gap-8 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            {headerLabel && (
              <div className="w-full text-sim-dark phones:w-full phones:text-left">
                <FormLabel>{headerLabel}</FormLabel>
              </div>
            )}
            <div className="w-full phones:w-full">
              <FormControl>
                <Select
                  {...field}
                  styles={{
                    ...customStyles,
                    singleValue: (provided) => ({
                      ...provided,
                      color: 'grey',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: 'grey',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: 0,
                      maxHeight: '30vh',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                        borderRadius: '6px',
                      },
                    }),
                    control: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      border:
                        '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
                      borderRadius: '0.375rem',
                      fontSize: '2rem',
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      color: 'rgb(32 34 35 / var(--tw-bg-opacity))',
                      cursor: isDisabled ? 'not-allowed' : 'default',
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor:
                          'rgb(240 244 247 / var(--tw-bg-opacity))',
                      },
                    }),
                  }}
                  className={'text-[2rem]'}
                  options={data}
                  value={data.filter((item) => item.value === field.value)[0]}
                  placeholder={placeholder ?? 'Input here'}
                  onChange={(optionSelected: {
                    value: string
                    label: string
                  }) => {
                    field.onChange(optionSelected?.value)
                    form.setValue(name, optionSelected?.value)
                  }}
                  isDisabled={isDisabled}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

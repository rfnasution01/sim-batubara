import { useGetGolonganQuery } from '@/store/slices/referensiAPI'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import { cn } from '@/libs/helpers/utils'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { GolonganType } from '@/libs/type'
import { customStyles } from '@/libs/variants/SelectProps'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
  setGolongan?: Dispatch<SetStateAction<string>>
}

export function SelectListGolongan({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
  setGolongan,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listGolongan, setListGolongan] = useState<GolonganType[]>([])

  const { data, isSuccess, isLoading, isFetching } = useGetGolonganQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListGolongan((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListGolongan([...(data?.data ?? [])])
      }
    }
  }, [data])

  let GolonganOption = []
  if (isSuccess) {
    GolonganOption = listGolongan.map((item) => {
      return {
        value: item?.id,
        label: item?.nama,
        pangkat: item?.pangkat,
      }
    })
  }

  const search = (newValue: string) => {
    if (newValue != query) {
      setQuery(newValue)
    }
  }

  const Option = (props) => {
    console.log(props)

    return (
      <components.Option {...props}>
        <div ref={props.innerRef}>
          <div className="flex flex-col">
            <p className="text-[2rem] font-bold">
              {props?.data?.pangkat ?? '-'}
            </p>
            <p className="text-[1.6rem] uppercase">{props.label ?? '-'}</p>
          </div>
        </div>
      </components.Option>
    )
  }

  return (
    <FormField
      name={name}
      control={useFormReturn.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'flex w-full flex-col gap-12 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            {headerLabel && (
              <div className="text-sim-dark phones:w-full phones:text-left">
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
                      maxHeight: '20vh',
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
                  options={GolonganOption}
                  value={
                    GolonganOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected?.value)
                    if (setListGolongan) {
                      setGolongan(optionSelected?.value)
                    }
                  }}
                  isDisabled={isDisabled}
                  isLoading={isFetching || isLoading}
                  components={{ Option }}
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

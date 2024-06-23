import { useGetSatuanKerjaQuery } from '@/store/slices/referensiAPI'
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
import { SatuanKerjaType } from '@/libs/type'
import { customStyles } from '@/libs/variants/SelectProps'
import clsx from 'clsx'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
  setSatuanKerja?: Dispatch<SetStateAction<string>>
}

export function SelectListSatuanKerja({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
  setSatuanKerja,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listSatuanKerja, setListSatuanKerja] = useState<SatuanKerjaType[]>([])

  const { data, isSuccess, isLoading, isFetching } = useGetSatuanKerjaQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListSatuanKerja((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListSatuanKerja([...(data?.data ?? [])])
      }
    }
  }, [data])

  function addLevelAndSort(data) {
    const result = []
    const map = new Map()

    // Initialize map with parent IDs
    data?.forEach((item) => map?.set(item?.id, { ...item, children: [] }))

    // Build the hierarchy
    data?.forEach((item) => {
      const parentId = item?.id_parent ?? '0'
      if (parentId === '0') {
        map.get(item?.id).level = 1
        result?.push(map?.get(item?.id))
      } else {
        map.get(item?.id).level = (map?.get(parentId)?.level ?? 0) + 1
        map.get(parentId)?.children?.push(map?.get(item?.id))
      }
    })

    // Function to flatten the nested structure
    function flatten(items) {
      const flat = []
      items?.forEach((item) => {
        flat?.push({
          id: item?.id,
          kode: item?.kode,
          nama: item?.nama,
          id_parent: item?.id_parent,
          level: item?.level,
          urutan: item?.urutan,
        })
        if (item?.children?.length) {
          flat.push(...flatten(item?.children))
        }
      })
      return flat
    }

    return flatten(result)
  }

  const sortedData = addLevelAndSort(listSatuanKerja)

  let SatuanKerjaOption = []
  if (isSuccess) {
    SatuanKerjaOption = sortedData.map((item) => {
      return {
        value: item?.id,
        label: item?.nama,
        level: item?.level,
      }
    })
  }

  const search = (newValue: string) => {
    if (newValue != query) {
      setQuery(newValue)
    }
  }

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div ref={props.innerRef}>
          <div
            className={clsx('text-[2rem]', {
              'font-bold': Number(props?.data?.level) === 1,
              'font-medium': Number(props?.data?.level) === 2,
              'font-light': Number(props?.data?.level) === 3,
            })}
          >
            {props.label}
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
              'z-50 flex w-full flex-col gap-12 phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
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
                      maxHeight: '27vh',
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
                  options={SatuanKerjaOption}
                  value={
                    SatuanKerjaOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected?.value)
                    if (setListSatuanKerja) {
                      setSatuanKerja(optionSelected?.value)
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

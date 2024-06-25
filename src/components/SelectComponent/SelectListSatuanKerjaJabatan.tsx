import { useGetSatuanKerjaJabatanQuery } from '@/store/slices/referensiAPI'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import { cn } from '@/libs/helpers/utils'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/libs/variants/SelectProps'
import clsx from 'clsx'
import { SatuanKerjaJabatanType } from '@/libs/type'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
}

export function SelectListSatuanKerjaJabatan({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listSatuanKerjaJabatan, setListSatuanKerjaJabatan] = useState<
    SatuanKerjaJabatanType[]
  >([])

  const { data, isSuccess, isLoading, isFetching } =
    useGetSatuanKerjaJabatanQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListSatuanKerjaJabatan((prevData) => [
          ...prevData,
          ...(data?.data ?? []),
        ])
      } else {
        setListSatuanKerjaJabatan([...(data?.data ?? [])])
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
      const parentId = item?.id_parent ?? 'A8ACA73B6E5D3912E040640A040269BB'
      if (parentId === 'A8ACA73B6E5D3912E040640A040269BB') {
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
          nama_satker: item?.nama_satker,
          nama_jabatan: item?.nama_jabatan,
          id_parent: item?.id_parent,
          level: item?.level,
        })
        if (item?.children?.length) {
          flat.push(...flatten(item?.children))
        }
      })
      return flat
    }

    return flatten(result)
  }

  const sortedData = addLevelAndSort(listSatuanKerjaJabatan)

  let SatuanKerjaJabatanOption = []
  if (isSuccess) {
    SatuanKerjaJabatanOption = sortedData.map((item) => {
      return {
        value: item?.id,
        label: item?.nama_jabatan,
        level: item?.level,
        satker: item?.nama_satker,
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
            className={clsx('flex flex-col gap-4 text-[2rem]', {
              'ml-0 font-bold': Number(props?.data?.level) === 1,
              'ml-16 font-medium': Number(props?.data?.level) === 2,
              'ml-32 font-light': Number(props?.data?.level) === 3,
            })}
          >
            <p className="text-[2rem] font-bold">{props?.label ?? '-'}</p>
            <p className="text-[1.6rem] uppercase">
              {props?.data?.satker ?? '-'}
            </p>
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
              'z-20 flex w-full flex-col gap-12 phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
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
                  options={SatuanKerjaJabatanOption}
                  value={
                    SatuanKerjaJabatanOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    console.log({ optionSelected })

                    field.onChange(optionSelected?.value)
                    useFormReturn.setValue(
                      'satuanKerjaString',
                      optionSelected?.satker,
                    )
                    useFormReturn.setValue(
                      'namaJabatanString',
                      optionSelected?.label,
                    )
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

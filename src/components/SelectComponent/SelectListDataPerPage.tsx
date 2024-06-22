import Select from 'react-select'
import { customStyles } from '@/libs/variants/SelectProps'
import { listDataPerPage } from '@/libs/dummy/ListDataPerPage'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterSlice, setStateFilter } from '@/store/reducer/stateFilter'

export function SelectListDataPerPage({ className }: { className?: string }) {
  const dispatch = useDispatch()
  const { search, id_golongan, id_organisasi, jabatan } =
    useSelector(getFilterSlice)

  return (
    <Select
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
          maxHeight: '50vh',
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
          backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
          border: '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
          borderRadius: '0.375rem',
          fontSize: '2rem',
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity))',
          color: 'rgb(32 34 35 / var(--tw-bg-opacity))',
          ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgb(240 244 247 / var(--tw-bg-opacity))',
          },
        }),
      }}
      defaultValue={listDataPerPage[0]}
      className={`${className} z-20 text-[2rem]`}
      options={listDataPerPage}
      onChange={(optionSelected: { value: number; label: number }) => {
        dispatch(
          setStateFilter({
            pageNumber: 1,
            pageSize: optionSelected?.value,
            search: search,
            id_golongan: id_golongan,
            id_organisasi: id_organisasi,
            jabatan: jabatan,
          }),
        )
      }}
    />
  )
}

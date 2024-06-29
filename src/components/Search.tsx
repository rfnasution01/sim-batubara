import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterSlice, setStateFilter } from '@/store/reducer/stateFilter'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Searching({
  className,
  isDashboard,
  pegawai,
}: {
  className?: string
  isDashboard?: boolean
  pegawai?: string
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { pageSize, id_golongan, id_organisasi, jabatan } =
    useSelector(getFilterSlice)

  const handleSearch = debounce((searchValue: string) => {
    dispatch(
      setStateFilter({
        pageNumber: 1,
        pageSize: pageSize,
        search: searchValue,
        id_golongan: id_golongan,
        id_organisasi: id_organisasi,
        jabatan: jabatan,
      }),
    )
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const handleClick = () => {
    const inputElement = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    debounce(() => {
      dispatch(
        setStateFilter({
          pageNumber: 1,
          pageSize: pageSize,
          search: inputElement?.value,
          id_golongan: id_golongan,
          id_organisasi: id_organisasi,
          jabatan: jabatan,
        }),
      )
    }, 300)

    if (isDashboard) {
      navigate(`/kepegawaian/${pegawai}`)
    }
  }
  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
        placeholder={'Search'}
        onChange={(e) => onSearch(e)}
      />
      <button
        className={`bg-sim-primary px-12 text-white`}
        type="button"
        style={{
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
        }}
        onClick={() => handleClick()}
      >
        <Search size={20} />
      </button>
    </div>
  )
}

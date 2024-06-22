import { getFilterSlice, setStateFilter } from '@/store/reducer/stateFilter'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

export const Pagination = ({
  pageNow,
  lastPage,
}: {
  pageNow: number
  lastPage: number
}) => {
  const dispatch = useDispatch()
  const { pageSize, search } = useSelector(getFilterSlice)

  return (
    <div className="flex items-center gap-24">
      <span
        className={clsx('border p-4', {
          'hover:cursor-pointer': pageNow > 1,
          'opacity-20 hover:cursor-not-allowed': !(pageNow > 1),
        })}
        onClick={() => {
          if (pageNow > 1) {
            dispatch(
              setStateFilter({
                pageNumber: pageNow - 1,
                pageSize: pageSize,
                search: search,
              }),
            )
          }
        }}
      >
        <ChevronLeft />
      </span>
      <p>
        <span className="text-rose-950">{pageNow}</span> / {lastPage}
      </p>
      <span
        className={clsx('border p-4', {
          'hover:cursor-pointer': pageNow < lastPage,
          'opacity-20 hover:cursor-not-allowed': !(pageNow < lastPage),
        })}
        onClick={() => {
          if (pageNow < lastPage) {
            dispatch(
              setStateFilter({
                pageNumber: pageNow + 1,
                pageSize: pageSize,
                search: search,
              }),
            )
          }
        }}
      >
        <ChevronRight />
      </span>
    </div>
  )
}

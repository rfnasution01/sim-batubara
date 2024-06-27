import { Breadcrumb } from '@/components/Breadcrumb'
import { Searching } from '@/components/Search'
import { SelectListDataPerPage } from '@/components/SelectComponent'
import { MenubarFilter } from '@/components/MenubarComponent'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { Outlet } from 'react-router-dom'

export default function KepegawaianLayoutMain() {
  const { splittedPath } = usePathname()

  return (
    <div
      className={clsx('scrollbar flex h-full flex-col gap-32 overflow-y-auto', {
        'rounded-4x bg-white px-32 pb-32 pt-48': splittedPath?.length <= 3,
      })}
    >
      {/* --- Header --- */}
      <div className="flex items-center justify-between gap-32">
        {/* --- Title --- */}
        <Breadcrumb length={splittedPath?.length} />
        {splittedPath?.length <= 3 && (
          <div className="flex w-2/4 items-center gap-32 phones:w-full">
            <SelectListDataPerPage className="w-1/3" />
            <Searching className="w-2/3" />
            <MenubarFilter />
          </div>
        )}
      </div>
      <Outlet />
    </div>
  )
}

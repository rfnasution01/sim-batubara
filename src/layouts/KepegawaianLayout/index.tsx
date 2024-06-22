import { Breadcrumb } from '@/components/Breadcrumb'
import { Searching } from '@/components/Search'
import { SelectListDataPerPage } from '@/components/SelectComponent'
import { Outlet } from 'react-router-dom'

export default function KepegawaianLayoutMain() {
  return (
    <div className="flex h-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex items-center justify-between gap-32">
        {/* --- Title --- */}
        <Breadcrumb />
        <div className="flex w-1/3 items-center gap-32 phones:w-full">
          <SelectListDataPerPage className="w-1/3" />
          <Searching className="w-2/3" />
        </div>
      </div>
      <Outlet />
    </div>
  )
}

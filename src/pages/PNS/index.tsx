import { Pagination } from '@/components/Pagination'
import { Table } from '@/components/Table'
import { ListDataPNS } from '@/libs/dummy/ListDataPegawaiPNS'
import { columnsListDataPNS } from '@/libs/helpers/table'
import { getFilterSlice } from '@/store/reducer/stateFilter'
import { useSelector } from 'react-redux'

export default function PNS() {
  const { pageNumber, pageSize } = useSelector(getFilterSlice)

  const lastPage = Math.ceil(ListDataPNS?.length / pageSize)
  const isLoading = false
  return (
    <div className="flex h-full flex-col gap-32">
      <Table
        data={ListDataPNS}
        columns={columnsListDataPNS}
        containerClasses="w-full h-full"
        loading={isLoading}
        // maxHeight="h-full"
      />
      <div className="flex items-center justify-end">
        {ListDataPNS?.length > 0 && (
          <Pagination pageNow={pageNumber ?? 0} lastPage={lastPage ?? 0} />
        )}
      </div>
    </div>
  )
}

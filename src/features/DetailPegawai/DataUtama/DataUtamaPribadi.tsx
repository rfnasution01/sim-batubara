import { TableDataPribadi } from '@/components/TableComponent'
import { DataKepegawaianUtamaType } from '@/libs/type'

export function DataUtamaPribadi({ data }: { data: DataKepegawaianUtamaType }) {
  return (
    <div className="flex flex-col gap-32">
      <p className="text-[3rem] font-bold">Data Pribadi</p>
      <TableDataPribadi data={data} />
    </div>
  )
}

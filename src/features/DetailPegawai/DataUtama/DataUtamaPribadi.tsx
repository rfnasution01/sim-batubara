import { TableDataPribadi } from '@/components/TableComponent'
import { DataKepegawaianUtamaType } from '@/libs/type'

export function DataUtamaPribadi({
  data,
  idPegawai,
}: {
  data: DataKepegawaianUtamaType
  idPegawai: string
}) {
  return (
    <div className="flex flex-col gap-32">
      <p className="text-[3rem] font-bold">Data Pribadi</p>
      <TableDataPribadi data={data} idPegawai={idPegawai} />
    </div>
  )
}

import { TableReferensi } from '@/components/TableReferensi'
import { ListAgama } from '@/libs/dummy/ListAgama'
import { columnsListTableAgama } from '@/libs/helpers/table'

export default function JenjangJF() {
  return (
    <div className="flex w-full gap-64 phones:flex-col">
      {/* --- SIASN --- */}
      <div className="flex w-1/2 flex-col gap-16 phones:w-full">
        <div className="flex items-center justify-between text-[2.4rem]">
          <p className="font-bold text-sim-dark">Data SIASN BKN</p>
          <p className="text-sim-grey">({ListAgama?.siasn?.length} data)</p>
        </div>
        <TableReferensi
          data={ListAgama?.siasn}
          columns={columnsListTableAgama}
          isNumber
          containerClasses="w-full h-full"
          // loading={isLoadingKepegawaianPNS}
          pageSize={10}
          currentPage={1}
        />
      </div>
      {/* --- Lokal --- */}
      <div className="flex w-1/2 flex-col gap-16 phones:w-full">
        <div className="flex items-center justify-between text-[2.4rem]">
          <p className="font-bold text-sim-dark">Data SIMPEG batu Bara</p>
          <p className="text-sim-grey">({ListAgama?.siasn?.length} data)</p>
        </div>
        <TableReferensi
          data={ListAgama?.siasn}
          columns={columnsListTableAgama}
          isNumber
          containerClasses="w-full h-full"
          // loading={isLoadingKepegawaianPNS}
          pageSize={10}
          currentPage={1}
        />
      </div>
    </div>
  )
}

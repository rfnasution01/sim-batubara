import { useState } from 'react'
import { DataUtamaTab } from './DataUtamaTab'
import { ComingSoonPage } from '@/routes/loadables'
import { DataUtamaPribadi } from './DataUtamaPribadi'
import { DataKepegawaianUtamaType } from '@/libs/type'

export function DataUtamaMain({
  data,
  idPegawai,
}: {
  data: DataKepegawaianUtamaType
  idPegawai: string
}) {
  const [tab, setTab] = useState<string>('Data Pribadi')

  return (
    <div className="flex flex-col gap-32 px-32">
      <DataUtamaTab tab={tab} setTab={setTab} />

      {tab === 'Data Pribadi' ? (
        <DataUtamaPribadi data={data} idPegawai={idPegawai} />
      ) : (
        <ComingSoonPage />
      )}
    </div>
  )
}

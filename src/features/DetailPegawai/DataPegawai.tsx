import { getDetailPegawaiSlice } from '@/store/reducer/stateDetailPegawai'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DataDetailPegawaiTab } from './DataPegawaiTab'
import { DataRiwayatMain } from './DataRiwayat'
import { DataUtamaMain } from './DataUtama'
import { DataKepegawaianUtamaType } from '@/libs/type'

export function DataDetailPegawai({
  data,
  idPegawai,
}: {
  data: DataKepegawaianUtamaType
  idPegawai: string
}) {
  const stateTab = useSelector(getDetailPegawaiSlice)?.tab

  useEffect(() => {
    if (stateTab) {
      setTab(stateTab)
    }
  }, [stateTab])

  const tabParams = localStorage.getItem('tab') ?? 'utama'

  const [tab, setTab] = useState<string>(tabParams ?? stateTab ?? '')

  const isIDPegawaiValid = data?.siasn?.ID === data?.lokal?.ID

  return (
    <div className="flex flex-col gap-32 rounded-2x bg-white py-32">
      <DataDetailPegawaiTab
        setTab={setTab}
        tab={tab}
        isIdPegawaiValid={isIDPegawaiValid}
      />
      {tab === 'utama' ? (
        <DataUtamaMain data={data} idPegawai={idPegawai} />
      ) : (
        <DataRiwayatMain />
      )}
    </div>
  )
}

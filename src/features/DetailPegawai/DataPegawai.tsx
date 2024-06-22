import { getDetailPegawaiSlice } from '@/store/reducer/stateDetailPegawai'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DataDetailPegawaiTab } from './DataPegawaiTab'
import { DataRiwayatMain } from './DataRiwayat'
import { DataUtamaMain } from './DataUtama'

export function DataDetailPegawai() {
  const stateTab = useSelector(getDetailPegawaiSlice)?.tab

  useEffect(() => {
    if (stateTab) {
      setTab(stateTab)
    }
  }, [stateTab])

  const tabParams = localStorage.getItem('tab') ?? 'utama'

  const [tab, setTab] = useState<string>(tabParams ?? stateTab ?? '')

  return (
    <div className="flex flex-col gap-32 rounded-2x bg-white py-32">
      <DataDetailPegawaiTab setTab={setTab} tab={tab} />
      {tab === 'utama' ? <DataUtamaMain /> : <DataRiwayatMain />}
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quasi
      doloribus sunt nobis aspernatur perspiciatis sed accusantium in ex, fuga
      velit excepturi nemo veritatis ut tempora amet modi odit illum. */}
    </div>
  )
}

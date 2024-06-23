import { getDetailPegawaiSlice } from '@/store/reducer/stateDetailPegawai'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DataDetailPegawaiTab } from './DataPegawaiTab'
import { DataRiwayatMain } from './DataRiwayat'
import { DataUtamaMain } from './DataUtama'
import { DataKepegawaianUtamaType } from '@/libs/type'
import { UseFormReturn } from 'react-hook-form'

export function DataDetailPegawai({
  data,
  idPegawai,
  handleSubmitDataUtama,
  form,
  isSinkronDataUtama,
}: {
  data: DataKepegawaianUtamaType
  idPegawai: string
  handleSubmitDataUtama: () => Promise<void>
  form: UseFormReturn
  isSinkronDataUtama: boolean
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
        <DataUtamaMain
          data={data}
          handleSubmitDataUtama={handleSubmitDataUtama}
          form={form}
          isSinkronDataUtama={isSinkronDataUtama}
        />
      ) : (
        <DataRiwayatMain idPegawai={idPegawai} />
      )}
    </div>
  )
}

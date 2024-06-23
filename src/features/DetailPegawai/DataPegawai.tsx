import { useState } from 'react'
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
  handleSubmitRiwayatGolongan,
  isSinkronRiwayatGolongan,
  handleSubmitRiwayatPendidikan,
  isSinkronRiwayatPendidikan,
}: {
  data: DataKepegawaianUtamaType
  idPegawai: string
  form: UseFormReturn
  handleSubmitDataUtama: () => Promise<void>
  isSinkronDataUtama: boolean
  handleSubmitRiwayatGolongan: () => Promise<void>
  isSinkronRiwayatGolongan: boolean
  handleSubmitRiwayatPendidikan: () => Promise<void>
  isSinkronRiwayatPendidikan: boolean
}) {
  // const stateTab = useSelector(getDetailPegawaiSlice)?.tab

  // useEffect(() => {
  //   if (stateTab) {
  //     setTab(stateTab)
  //   }
  // }, [stateTab])

  // const tabParams = localStorage.getItem('tab') ?? 'utama'

  const [tab, setTab] = useState<string>('utama')

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
        <DataRiwayatMain
          idPegawai={idPegawai}
          form={form}
          handleSubmitRiwayatGolongan={handleSubmitRiwayatGolongan}
          isSinkronRiwayatGolongan={isSinkronRiwayatGolongan}
          handleSubmitRiwayatPendidikan={handleSubmitRiwayatPendidikan}
          isSinkronRiwayatPendidikan={isSinkronRiwayatPendidikan}
        />
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { DataDetailPegawaiTab } from './DataPegawaiTab'
import { DataRiwayatMain } from './DataRiwayat'
import { DataUtamaMain } from './DataUtama'
import { DataKepegawaianUtamaType } from '@/libs/type'
import { UseFormReturn } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getDetailPegawaiSlice } from '@/store/reducer/stateDetailPegawai'

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
  handleSubmitRiwayatJabatan,
  isSinkronRiwayatJabatan,
  handleSubmitRiwayatDiklat,
  handleSubmitRiwayatDiklatLainnya,
  handleSubmitRiwayatPenghargaan,
  isSinkronRiwayatDiklat,
  isSinkronRiwayatDiklatLainnya,
  isSinkronRiwayatPenghargaan,
  handleDeleteJabatan,
  isLoadingDeleteJabatan,
  formDelete,
  handleDeleteDiklat,
  isLoadingDeleteDiklat,
  handleDeleteKursus,
  handleDeletePenghargaan,
  isLoadingDeleteKursus,
  isLoadingDeletePenghargaan,
  handleSubmitRiwayatPMK,
  isSinkronRiwayatPMK,
  handleSubmitRiwayatPindahInstansi,
  isSinkronRiwayatPindahInstansi,
  handleDeleteAngkaKredit,
  handleSubmitRiwayatAngkaKredit,
  isLoadingDeleteAngkaKredit,
  isSinkronRiwayatAngkaKredit,
  handleSubmitRiwayatDP3,
  handleSubmitRiwayatKeluarga,
  isSinkronRiwayatDP3,
  isSinkronRiwayatKeluarga,
  isSinkronRiwayatAnak,
  handleSubmitRiwayatAnak,
  idParams,
}: {
  data: DataKepegawaianUtamaType
  idPegawai: string
  form: UseFormReturn
  formDelete: UseFormReturn
  handleSubmitDataUtama: () => Promise<void>
  isSinkronDataUtama: boolean
  handleSubmitRiwayatGolongan: () => Promise<void>
  isSinkronRiwayatGolongan: boolean
  handleSubmitRiwayatPendidikan: () => Promise<void>
  isSinkronRiwayatPendidikan: boolean
  handleSubmitRiwayatJabatan: () => Promise<void>
  isSinkronRiwayatJabatan: boolean
  handleSubmitRiwayatPMK: () => Promise<void>
  isSinkronRiwayatPMK: boolean
  handleSubmitRiwayatDiklat: () => Promise<void>
  isSinkronRiwayatDiklat: boolean
  handleSubmitRiwayatDiklatLainnya: () => Promise<void>
  isSinkronRiwayatDiklatLainnya: boolean
  handleSubmitRiwayatPindahInstansi: () => Promise<void>
  isSinkronRiwayatPindahInstansi: boolean
  handleSubmitRiwayatPenghargaan: () => Promise<void>
  isSinkronRiwayatPenghargaan: boolean
  handleDeleteJabatan: (id: string) => Promise<void>
  isLoadingDeleteJabatan: boolean
  handleDeleteDiklat: (id: string) => Promise<void>
  isLoadingDeleteDiklat: boolean
  handleDeleteKursus: (id: string) => Promise<void>
  isLoadingDeleteKursus: boolean
  handleDeletePenghargaan: (id: string) => Promise<void>
  isLoadingDeletePenghargaan: boolean
  handleSubmitRiwayatAngkaKredit: () => Promise<void>
  isSinkronRiwayatAngkaKredit: boolean
  handleDeleteAngkaKredit: (id: string) => Promise<void>
  isLoadingDeleteAngkaKredit: boolean
  handleSubmitRiwayatDP3: () => Promise<void>
  isSinkronRiwayatDP3: boolean
  handleSubmitRiwayatKeluarga: () => Promise<void>
  isSinkronRiwayatKeluarga: boolean
  handleSubmitRiwayatAnak: () => Promise<void>
  isSinkronRiwayatAnak: boolean
  idParams: string
}) {
  const stateTab = useSelector(getDetailPegawaiSlice)?.tab

  useEffect(() => {
    if (stateTab) {
      setTab(stateTab)
    }
  }, [stateTab])

  const tabParams = localStorage.getItem('tab') ?? 'utama'

  const [tab, setTab] = useState<string>(tabParams ?? 'utama')

  const isIDPegawaiValid = data?.siasn?.ID === data?.lokal?.ID

  const jenisJabatanID = data?.siasn?.jenisJabatanId

  return (
    <div className="flex flex-col gap-32 overflow-y-auto rounded-2x bg-white py-32 pb-96">
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
          handleSubmitRiwayatGolongan={handleSubmitRiwayatGolongan}
          handleSubmitRiwayatJabatan={handleSubmitRiwayatJabatan}
          handleSubmitRiwayatPendidikan={handleSubmitRiwayatPendidikan}
          isSinkronRiwayatGolongan={isSinkronRiwayatGolongan}
          isSinkronRiwayatJabatan={isSinkronRiwayatJabatan}
          isSinkronRiwayatPendidikan={isSinkronRiwayatPendidikan}
          idPegawai={idPegawai}
          idParams={idParams}
        />
      ) : (
        <DataRiwayatMain
          idPegawai={idPegawai}
          jenisJabatanId={jenisJabatanID}
          form={form}
          formDelete={formDelete}
          handleSubmitRiwayatGolongan={handleSubmitRiwayatGolongan}
          isSinkronRiwayatGolongan={isSinkronRiwayatGolongan}
          handleSubmitRiwayatPendidikan={handleSubmitRiwayatPendidikan}
          isSinkronRiwayatPendidikan={isSinkronRiwayatPendidikan}
          handleSubmitRiwayatJabatan={handleSubmitRiwayatJabatan}
          isSinkronRiwayatJabatan={isSinkronRiwayatJabatan}
          handleSubmitRiwayatDiklat={handleSubmitRiwayatDiklat}
          isSinkronRiwayatDiklat={isSinkronRiwayatDiklat}
          handleSubmitRiwayatDiklatLainnya={handleSubmitRiwayatDiklatLainnya}
          isSinkronRiwayatDiklatLainnya={isSinkronRiwayatDiklatLainnya}
          handleSubmitRiwayatPenghargaan={handleSubmitRiwayatPenghargaan}
          isSinkronRiwayatPenghargaan={isSinkronRiwayatPenghargaan}
          handleDeleteJabatan={handleDeleteJabatan}
          isLoadingDeleteJabatan={isLoadingDeleteJabatan}
          handleDeleteDiklat={handleDeleteDiklat}
          handleDeleteKursus={handleDeleteKursus}
          handleDeletePenghargaan={handleDeletePenghargaan}
          isLoadingDeleteDiklat={isLoadingDeleteDiklat}
          isLoadingDeleteKursus={isLoadingDeleteKursus}
          isLoadingDeletePenghargaan={isLoadingDeletePenghargaan}
          handleSubmitRiwayatPMK={handleSubmitRiwayatPMK}
          isSinkronRiwayatPMK={isSinkronRiwayatPMK}
          handleSubmitRiwayatPindahInstansi={handleSubmitRiwayatPindahInstansi}
          isSinkronRiwayatPindahInstansi={isSinkronRiwayatPindahInstansi}
          handleDeleteAngkaKredit={handleDeleteAngkaKredit}
          handleSubmitRiwayatAngkaKredit={handleSubmitRiwayatAngkaKredit}
          isLoadingDeleteAngkaKredit={isLoadingDeleteAngkaKredit}
          isSinkronRiwayatAngkaKredit={isSinkronRiwayatAngkaKredit}
          handleSubmitRiwayatDP3={handleSubmitRiwayatDP3}
          handleSubmitRiwayatKeluarga={handleSubmitRiwayatKeluarga}
          isSinkronRiwayatDP3={isSinkronRiwayatDP3}
          isSinkronRiwayatKeluarga={isSinkronRiwayatKeluarga}
          handleSubmitRiwayatAnak={handleSubmitRiwayatAnak}
          isSinkronRiwayatAnak={isSinkronRiwayatAnak}
        />
      )}
    </div>
  )
}

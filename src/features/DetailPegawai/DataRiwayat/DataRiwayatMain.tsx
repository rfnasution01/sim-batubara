import { Searching } from '@/components/Search'
import { AlignJustify, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DataRiwayatTab } from './DataRiwayatTab'
import { ComingSoonPage } from '@/routes/loadables'
import {
  TableDataAnak,
  TableDataAngkaKredit,
  TableDataDP3,
  TableDataDiklat,
  TableDataDiklatLainnya,
  TableDataGolongan,
  TableDataJabatan,
  TableDataKeluarga,
  TableDataMasaKerja,
  TableDataPendidikan,
  TableDataPenghargaan,
  TableDataPindahInstansi,
} from '@/components/TableComponent'
import { UseFormReturn } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getDetailRiwayatSlice } from '@/store/reducer/stateDetailRiwayat'

export function DataRiwayatMain({
  idPegawai,
  form,
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
  formDelete,
  handleDeleteJabatan,
  isLoadingDeleteJabatan,
  handleDeleteDiklat,
  handleDeleteKursus,
  handleDeletePenghargaan,
  isLoadingDeleteDiklat,
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
  jenisJabatanId,
  handleSubmitRiwayatDP3,
  handleSubmitRiwayatKeluarga,
  isSinkronRiwayatDP3,
  isSinkronRiwayatKeluarga,
  handleSubmitRiwayatAnak,
  isSinkronRiwayatAnak,
}: {
  idPegawai: string
  form: UseFormReturn
  formDelete: UseFormReturn
  handleSubmitRiwayatGolongan: () => Promise<void>
  isSinkronRiwayatGolongan: boolean
  handleSubmitRiwayatPendidikan: () => Promise<void>
  isSinkronRiwayatPendidikan: boolean
  handleSubmitRiwayatPMK: () => Promise<void>
  isSinkronRiwayatPMK: boolean
  handleSubmitRiwayatJabatan: () => Promise<void>
  isSinkronRiwayatJabatan: boolean
  handleSubmitRiwayatDiklat: () => Promise<void>
  isSinkronRiwayatDiklat: boolean
  handleSubmitRiwayatDiklatLainnya: () => Promise<void>
  isSinkronRiwayatDiklatLainnya: boolean
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
  handleSubmitRiwayatPindahInstansi: () => Promise<void>
  isSinkronRiwayatPindahInstansi: boolean
  handleSubmitRiwayatAngkaKredit: () => Promise<void>
  isSinkronRiwayatAngkaKredit: boolean
  handleDeleteAngkaKredit: (id: string) => Promise<void>
  isLoadingDeleteAngkaKredit: boolean
  jenisJabatanId?: string
  handleSubmitRiwayatDP3: () => Promise<void>
  isSinkronRiwayatDP3: boolean
  handleSubmitRiwayatKeluarga: () => Promise<void>
  isSinkronRiwayatKeluarga: boolean
  handleSubmitRiwayatAnak: () => Promise<void>
  isSinkronRiwayatAnak: boolean
}) {
  const [isShow, setIsShow] = useState<boolean>(true)

  const stateTab = useSelector(getDetailRiwayatSlice)?.tab

  useEffect(() => {
    if (stateTab) {
      setTab(stateTab)
    }
  }, [stateTab])

  const tabParams = localStorage.getItem('tabRiwayat') ?? 'Golongan & Pangkat'
  const [tab, setTab] = useState<string>(tabParams ?? 'Golongan & Pangkat')

  return (
    <div className="flex w-full gap-32 px-32">
      <div className="flex flex-col gap-32">
        <div
          className="py-12 hover:cursor-pointer"
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? (
            <div className="flex items-center gap-12 text-sim-dark">
              <X size={16} />
              Kategori Data Riwayat
            </div>
          ) : (
            <AlignJustify size={16} />
          )}
        </div>
        {isShow && <DataRiwayatTab setTab={setTab} tab={tab} />}
      </div>
      <div className="flex flex-1 flex-col gap-32">
        <div className="flex items-center justify-between">
          <p className="text-[2.4rem] font-bold">Data Riwayat {tab}</p>
          <Searching className="w-1/3" />
        </div>
        {tab === 'Golongan & Pangkat' ? (
          <TableDataGolongan
            idPegawai={idPegawai}
            form={form}
            handleSubmitRiwayatGolongan={handleSubmitRiwayatGolongan}
            isSinkronRiwayatGolongan={isSinkronRiwayatGolongan}
          />
        ) : tab === 'Pendidikan' ? (
          <TableDataPendidikan
            idPegawai={idPegawai}
            form={form}
            handleSubmitriwayatPendidikan={handleSubmitRiwayatPendidikan}
            isSinkronriwayatPendidikan={isSinkronRiwayatPendidikan}
          />
        ) : tab === 'Jabatan' ? (
          <TableDataJabatan
            handleSubmitriwayatJabatan={handleSubmitRiwayatJabatan}
            isSinkronriwayatJabatan={isSinkronRiwayatJabatan}
            form={form}
            idPegawai={idPegawai}
            handleDeleteJabatan={handleDeleteJabatan}
            formDelete={formDelete}
            isLoadingDeleteJabatan={isLoadingDeleteJabatan}
          />
        ) : tab === 'Diklat Struktural' ? (
          <TableDataDiklat
            handleSubmitriwayatDiklat={handleSubmitRiwayatDiklat}
            isSinkronriwayatDiklat={isSinkronRiwayatDiklat}
            form={form}
            idPegawai={idPegawai}
            handleDeleteDiklat={handleDeleteDiklat}
            isLoadingDeleteDiklat={isLoadingDeleteDiklat}
            formDelete={formDelete}
          />
        ) : tab === 'Diklat Lainnya' ? (
          <TableDataDiklatLainnya
            handleSubmitriwayatDiklatLainnya={handleSubmitRiwayatDiklatLainnya}
            isSinkronriwayatDiklatLainnya={isSinkronRiwayatDiklatLainnya}
            form={form}
            idPegawai={idPegawai}
            handleDeleteKursus={handleDeleteKursus}
            isLoadingDeleteKursus={isLoadingDeleteKursus}
            formDelete={formDelete}
          />
        ) : tab === 'Penghargaan' ? (
          <TableDataPenghargaan
            isSinkronriwayatPenghargaan={isSinkronRiwayatPenghargaan}
            handleSubmitriwayatPenghargaan={handleSubmitRiwayatPenghargaan}
            form={form}
            idPegawai={idPegawai}
            handleDeletePenghargaan={handleDeletePenghargaan}
            isLoadingDeletePenghargaan={isLoadingDeletePenghargaan}
            formDelete={formDelete}
          />
        ) : tab === 'Pindah Instansi' ? (
          <TableDataPindahInstansi
            isSinkronriwayatPindahInstansi={isSinkronRiwayatPindahInstansi}
            handleSubmitriwayatPindahInstansi={
              handleSubmitRiwayatPindahInstansi
            }
            form={form}
            idPegawai={idPegawai}
          />
        ) : tab === 'PMK' ? (
          <TableDataMasaKerja
            isSinkronriwayatMasaKerja={isSinkronRiwayatPMK}
            handleSubmitriwayatMasaKerja={handleSubmitRiwayatPMK}
            form={form}
            idPegawai={idPegawai}
          />
        ) : tab === 'Angka Kredit' ? (
          <TableDataAngkaKredit
            form={form}
            formDelete={formDelete}
            idPegawai={idPegawai}
            isSinkronriwayatAngkaKredit={isSinkronRiwayatAngkaKredit}
            handleDeleteAngkaKredit={handleDeleteAngkaKredit}
            handleSubmitriwayatAngkaKredit={handleSubmitRiwayatAngkaKredit}
            isLoadingDeleteAngkaKredit={isLoadingDeleteAngkaKredit}
            jenisJabatanId={jenisJabatanId}
          />
        ) : tab === 'DP3' ? (
          <TableDataDP3
            idPegawai={idPegawai}
            form={form}
            handleSubmitriwayatDP3={handleSubmitRiwayatDP3}
            isSinkronriwayatDP3={isSinkronRiwayatDP3}
          />
        ) : tab === 'Keluarga' ? (
          <TableDataKeluarga
            idPegawai={idPegawai}
            form={form}
            handleSubmitriwayatKeluarga={handleSubmitRiwayatKeluarga}
            isSinkronriwayatKeluarga={isSinkronRiwayatKeluarga}
          />
        ) : tab === 'Anak' ? (
          <TableDataAnak
            idPegawai={idPegawai}
            form={form}
            handleSubmitriwayatAnak={handleSubmitRiwayatAnak}
            isSinkronriwayatAnak={isSinkronRiwayatAnak}
          />
        ) : (
          <ComingSoonPage />
        )}
      </div>
    </div>
  )
}

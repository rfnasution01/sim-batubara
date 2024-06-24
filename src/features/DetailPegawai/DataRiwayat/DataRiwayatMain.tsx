import { Searching } from '@/components/Search'
import { AlignJustify, X } from 'lucide-react'
import { useState } from 'react'
import { DataRiwayatTab } from './DataRiwayatTab'
import { ComingSoonPage } from '@/routes/loadables'
import {
  TableDataDiklat,
  TableDataDiklatLainnya,
  TableDataGolongan,
  TableDataJabatan,
  TableDataPendidikan,
  TableDataPenghargaan,
} from '@/components/TableComponent'
import { UseFormReturn } from 'react-hook-form'

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
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitRiwayatGolongan: () => Promise<void>
  isSinkronRiwayatGolongan: boolean
  handleSubmitRiwayatPendidikan: () => Promise<void>
  isSinkronRiwayatPendidikan: boolean
  handleSubmitRiwayatJabatan: () => Promise<void>
  isSinkronRiwayatJabatan: boolean
  handleSubmitRiwayatDiklat: () => Promise<void>
  isSinkronRiwayatDiklat: boolean
  handleSubmitRiwayatDiklatLainnya: () => Promise<void>
  isSinkronRiwayatDiklatLainnya: boolean
  handleSubmitRiwayatPenghargaan: () => Promise<void>
  isSinkronRiwayatPenghargaan: boolean
}) {
  const [isShow, setIsShow] = useState<boolean>(true)
  const [tab, setTab] = useState<string>('Golongan & Pangkat')

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
          />
        ) : tab === 'Diklat Struktural' ? (
          <TableDataDiklat
            handleSubmitriwayatDiklat={handleSubmitRiwayatDiklat}
            isSinkronriwayatDiklat={isSinkronRiwayatDiklat}
            form={form}
            idPegawai={idPegawai}
          />
        ) : tab === 'Diklat Lainnya' ? (
          <TableDataDiklatLainnya
            handleSubmitriwayatDiklatLainnya={handleSubmitRiwayatDiklatLainnya}
            isSinkronriwayatDiklatLainnya={isSinkronRiwayatDiklatLainnya}
            form={form}
            idPegawai={idPegawai}
          />
        ) : tab === 'Penghargaan' ? (
          <TableDataPenghargaan
            isSinkronriwayatPenghargaan={isSinkronRiwayatPenghargaan}
            handleSubmitriwayatPenghargaan={handleSubmitRiwayatPenghargaan}
            form={form}
            idPegawai={idPegawai}
          />
        ) : (
          <ComingSoonPage />
        )}
      </div>
    </div>
  )
}

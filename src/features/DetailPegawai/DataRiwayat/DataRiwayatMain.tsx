import { Searching } from '@/components/Search'
import { AlignJustify, X } from 'lucide-react'
import { useState } from 'react'
import { DataRiwayatTab } from './DataRiwayatTab'
import { ComingSoonPage } from '@/routes/loadables'
import {
  TableDataGolongan,
  TableDataJabatan,
  TableDataPendidikan,
} from '@/components/TableComponent'
import { UseFormReturn } from 'react-hook-form'

export function DataRiwayatMain({
  idPegawai,
  form,
  handleSubmitRiwayatGolongan,
  isSinkronRiwayatGolongan,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitRiwayatGolongan: () => Promise<void>
  isSinkronRiwayatGolongan: boolean
}) {
  const [isShow, setIsShow] = useState<boolean>(false)
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
          <TableDataPendidikan />
        ) : tab === 'Jabatan' ? (
          <TableDataJabatan />
        ) : (
          <ComingSoonPage />
        )}
      </div>
    </div>
  )
}

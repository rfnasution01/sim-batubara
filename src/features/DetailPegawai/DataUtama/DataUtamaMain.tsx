import { useState } from 'react'
import { DataUtamaTab } from './DataUtamaTab'
import { ComingSoonPage } from '@/routes/loadables'
import { DataKepegawaianUtamaType } from '@/libs/type'
import { UseFormReturn } from 'react-hook-form'
import {
  TableDataPribadi,
  TableDataUtamaGolongan,
  TableDataUtamaJabatan,
  TableDataUtamaPendidikan,
} from '@/components/TableComponent'

export function DataUtamaMain({
  idPegawai,
  data,
  handleSubmitDataUtama,
  form,
  isSinkronDataUtama,
  handleSubmitRiwayatGolongan,
  handleSubmitRiwayatJabatan,
  handleSubmitRiwayatPendidikan,
  isSinkronRiwayatGolongan,
  isSinkronRiwayatJabatan,
  isSinkronRiwayatPendidikan,
}: {
  idPegawai: string
  data: DataKepegawaianUtamaType
  handleSubmitDataUtama: () => Promise<void>
  isSinkronDataUtama: boolean
  form: UseFormReturn
  handleSubmitRiwayatGolongan: () => Promise<void>
  isSinkronRiwayatGolongan: boolean
  handleSubmitRiwayatPendidikan: () => Promise<void>
  isSinkronRiwayatPendidikan: boolean
  handleSubmitRiwayatJabatan: () => Promise<void>
  isSinkronRiwayatJabatan: boolean
}) {
  const [tab, setTab] = useState<string>('Data Pribadi')

  return (
    <div className="flex flex-col gap-32 px-32">
      <DataUtamaTab tab={tab} setTab={setTab} />

      {tab === 'Data Pribadi' ? (
        <TableDataPribadi
          data={data}
          handleSubmitDataUtama={handleSubmitDataUtama}
          form={form}
          isSinkronDataUtama={isSinkronDataUtama}
        />
      ) : tab === 'Jabatan & Posisi' ? (
        <TableDataUtamaJabatan
          idPegawai={idPegawai}
          handleSubmitDataUtama={handleSubmitRiwayatJabatan}
          form={form}
          isSinkronDataUtama={isSinkronRiwayatJabatan}
        />
      ) : tab === 'Pendidikan' ? (
        <TableDataUtamaPendidikan
          idPegawai={idPegawai}
          handleSubmitDataUtama={handleSubmitRiwayatPendidikan}
          form={form}
          isSinkronDataUtama={isSinkronRiwayatPendidikan}
        />
      ) : tab === 'Golongan' ? (
        <TableDataUtamaGolongan
          idPegawai={idPegawai}
          handleSubmitDataUtama={handleSubmitRiwayatGolongan}
          form={form}
          isSinkronDataUtama={isSinkronRiwayatGolongan}
        />
      ) : (
        <ComingSoonPage />
      )}
    </div>
  )
}

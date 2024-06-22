import { Column } from '@/components/Table'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { convertToSlug } from './format-text'
import { DataKepegawaianType } from '../type'

export const columnsListDataPNS: Column<DataKepegawaianType>[] = [
  { header: 'NIP', key: 'nip', width: '!min-w-[12rem]' },
  { header: 'Nama', key: 'nama', width: '!min-w-[12rem]' },
  { header: 'JK', key: 'jk', width: '!min-w-[12rem]' },
  { header: 'Jabatan', key: 'jabatan', width: '!min-w-[12rem]' },
  {
    header: 'Gol',
    key: 'golongan',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return <div className="uppercase">{rowData?.golongan}</div>
    },
  },
  { header: 'Telepon', key: 'hp', width: '!min-w-[12rem]' },
  {
    header: 'Satuan Kerja',
    key: 'satker',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex items-center justify-between gap-32">
          <p>{rowData?.satker}</p>
          <Link
            to={`/kepegawaian/pns/${convertToSlug(rowData?.nama)}`}
            onClick={() => {
              localStorage.setItem('pegawaiID', rowData?.id_pegawai)
            }}
            className="rounded-2xl bg-sim-primary p-8 text-white"
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      )
    },
  },
]

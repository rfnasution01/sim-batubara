import { Column } from '@/components/Table'
import { LisdDataPegawai } from '../type'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { convertToSlug } from './format-text'

export const columnsListDataPNS: Column<LisdDataPegawai>[] = [
  { header: 'NIP', key: 'nip', width: '!min-w-[12rem]' },
  { header: 'Nama', key: 'nama', width: '!min-w-[12rem]' },
  { header: 'JK', key: 'jk', width: '!min-w-[12rem]' },
  { header: 'Jabatan', key: 'jabatan', width: '!min-w-[12rem]' },
  { header: 'Gol', key: 'gol', width: '!min-w-[12rem]' },
  { header: 'No. Telepon', key: 'noTelp', width: '!min-w-[12rem]' },
  {
    header: 'Satuan Kerja',
    key: 'satuanKerja',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex items-center justify-between gap-32">
          <p>{rowData?.satuanKerja}</p>
          <Link
            to={`/kepegawaian/pns/${convertToSlug(rowData?.nama)}`}
            className="rounded-2xl bg-sim-primary p-8 text-white"
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      )
    },
  },
]

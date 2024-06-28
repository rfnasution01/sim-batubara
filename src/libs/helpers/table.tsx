import { Column } from '@/components/Table'
import { DataKepegawaianType } from '../type'
import { AgamaType } from '../type/TabelReferensi'

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
]

export const columnsListTableAgama: Column<AgamaType>[] = [
  { header: 'Id', key: 'id', width: 'w-[10%]' },
  { header: 'Nama', key: 'nama', width: 'w-[80%]' },
]

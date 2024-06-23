import { TableDataPribadi } from '@/components/TableComponent'
import { DataKepegawaianUtamaType } from '@/libs/type'
import { UseFormReturn } from 'react-hook-form'

export function DataUtamaPribadi({
  data,
  handleSubmitDataUtama,
  form,
  isSinkronDataUtama,
}: {
  data: DataKepegawaianUtamaType
  handleSubmitDataUtama: () => Promise<void>
  form: UseFormReturn
  isSinkronDataUtama: boolean
}) {
  return (
    <div className="flex flex-col gap-32">
      <p className="text-[3rem] font-bold">Data Pribadi</p>
      <TableDataPribadi
        data={data}
        handleSubmitDataUtama={handleSubmitDataUtama}
        form={form}
        isSinkronDataUtama={isSinkronDataUtama}
      />
    </div>
  )
}

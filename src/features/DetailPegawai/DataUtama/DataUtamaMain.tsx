import { useState } from 'react'
import { DataUtamaTab } from './DataUtamaTab'
import { ComingSoonPage } from '@/routes/loadables'
import { DataUtamaPribadi } from './DataUtamaPribadi'
import { DataKepegawaianUtamaType } from '@/libs/type'
import { UseFormReturn } from 'react-hook-form'

export function DataUtamaMain({
  data,
  handleSubmitDataUtama,
  form,
  isSinkronDataUtama,
}: {
  data: DataKepegawaianUtamaType
  handleSubmitDataUtama: () => Promise<void>
  isSinkronDataUtama: boolean
  form: UseFormReturn
}) {
  const [tab, setTab] = useState<string>('Data Pribadi')

  return (
    <div className="flex flex-col gap-32 px-32">
      <DataUtamaTab tab={tab} setTab={setTab} />

      {tab === 'Data Pribadi' ? (
        <DataUtamaPribadi
          data={data}
          handleSubmitDataUtama={handleSubmitDataUtama}
          form={form}
          isSinkronDataUtama={isSinkronDataUtama}
        />
      ) : (
        <ComingSoonPage />
      )}
    </div>
  )
}

import { useState } from 'react'
import { DataUtamaTab } from './DataUtamaTab'
import { DataPribadi } from './DataPribadi'
import { ComingSoonPage } from '@/routes/loadables'

export function DataUtamaMain() {
  const [tab, setTab] = useState<string>('Data Pribadi')

  return (
    <div className="flex flex-col gap-32 px-32">
      <DataUtamaTab tab={tab} setTab={setTab} />
      {tab === 'Data Pribadi' ? <DataPribadi /> : <ComingSoonPage />}
    </div>
  )
}

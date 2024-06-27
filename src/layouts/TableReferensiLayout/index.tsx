import { Outlet } from 'react-router-dom'
import { TableReferensiHeader } from './TableReferensiHeader'

export default function TabelReferensiLayout() {
  return (
    <div className="flex h-full w-full flex-col gap-32">
      <TableReferensiHeader />
      <Outlet />
    </div>
  )
}

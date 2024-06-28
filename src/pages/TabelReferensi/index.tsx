import { usePathname } from '@/libs/hooks/usePathname'
import { ComingSoonPage } from '@/routes/loadables'
import Agama from './Agama'

export default function TabelReferensiPage() {
  const { secondPathname } = usePathname()
  return (
    <div className="scrollbar h-full overflow-y-auto">
      <div className="flex rounded-2x bg-white p-32">
        {secondPathname === 'agama' ? <Agama /> : <ComingSoonPage />}
      </div>
    </div>
  )
}

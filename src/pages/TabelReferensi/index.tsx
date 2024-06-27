import { usePathname } from '@/libs/hooks/usePathname'
import { ComingSoonPage } from '@/routes/loadables'

export default function TabelReferensiPage() {
  const { secondPathname } = usePathname()
  return (
    <div className="scrollbar h-full overflow-y-auto">
      {secondPathname === 'agama' ? <ComingSoonPage /> : <ComingSoonPage />}
    </div>
  )
}

import { MenubarTableReferensi } from '@/components/MenubarComponent'
import { useState } from 'react'

export function TableReferensiHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className="flex items-center gap-32 rounded-2x bg-white p-32 text-sim-dark">
      <p className="text-[2.8rem] font-bold">Tabel Referensi</p>
      <div className="flex flex-1" onClick={handleMenuClick}>
        <MenubarTableReferensi isMenuOpen={isMenuOpen} isShow={true} isHeader />
      </div>
    </div>
  )
}

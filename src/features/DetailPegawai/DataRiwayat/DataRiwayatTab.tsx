import { setStateDetailRiwayat } from '@/store/reducer/stateDetailRiwayat'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'

export function DataRiwayatTab({
  tab,
  setTab,
}: {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}) {
  const riwayatMenu = [
    'Golongan & Pangkat',
    'Pendidikan',
    'Jabatan',
    'Diklat Struktural',
    'Diklat Lainnya',
    'Pindah Instansi',
    'Penghargaan',
    'PMK',
    'Angka Kredit',
  ]

  const dispatch = useDispatch()

  return (
    <div className="flex flex-col rounded-2x border">
      {riwayatMenu.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            setTab(item)
            dispatch(setStateDetailRiwayat({ tab: item }))
            localStorage.setItem('tabRiwayat', item)
          }}
          className={clsx(
            'w-[30rem] border-b p-24 hover:cursor-pointer hover:bg-sim-primary hover:text-white',
            {
              'bg-sim-primary text-white': tab === item,
              'text-sim-grey': tab !== item,
            },
            {
              'rounded-tl-2x rounded-tr-2x': idx === 0,
              'rounded-bl-2x rounded-br-2x': idx === riwayatMenu?.length - 1,
            },
          )}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function DataUtamaTab({
  tab,
  setTab,
}: {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}) {
  const tabMenu = ['Data Pribadi', 'Pendidikan', 'Golongan', 'Jabatan & Posisi']
  return (
    <div className="flex w-full">
      {tabMenu.map((item, idx) => (
        <div
          className={clsx(
            'w-1/4 border-b border-r border-t px-24 py-16 text-center hover:cursor-pointer hover:bg-sim-primary hover:text-white',
            {
              'border-transparent bg-sim-primary text-white': tab === item,
              'border-sim-grey text-sim-grey': tab !== item,
            },
            {
              'rounded-r-full': idx === tabMenu.length - 1,
              'rounded-l-full border-r': idx === 0,
            },
          )}
          key={idx}
          onClick={() => {
            setTab(item)
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

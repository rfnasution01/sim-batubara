import { ModalCheckID } from '@/components/ModalComponent'
import { setStateDetailPegawai } from '@/store/reducer/stateDetailPegawai'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'

export function DataDetailPegawaiTab({
  tab,
  setTab,
  isIdPegawaiValid,
}: {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  isIdPegawaiValid?: boolean
}) {
  const dispatch = useDispatch()
  const compareTab = tab === 'utama' ? 'Data Utama' : 'Data Riwayat'
  const convertTab = (name: string) => {
    if (name === 'Data Utama') {
      return 'utama'
    } else {
      return 'riwayat'
    }
  }

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="flex items-center border-b border-sim-grey px-32">
      <div className="flex w-full gap-32">
        {['Data Utama', 'Data Riwayat'].map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'flex-1 border-b-2 pb-16 text-center text-[2.4rem] hover:cursor-pointer hover:text-sim-primary',
              {
                'border-sim-primary text-sim-primary': item === compareTab,
                'border-transparent text-sim-grey': item !== compareTab,
              },
            )}
            onClick={() => {
              if (item === 'Data Riwayat' && !isIdPegawaiValid) {
                setIsShow(true)
              } else {
                setTab(convertTab(item))
                dispatch(setStateDetailPegawai({ tab: convertTab(item) }))
                localStorage.setItem('tab', convertTab(item))
              }
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <ModalCheckID isOpen={isShow} setIsOpen={setIsShow} />
    </div>
  )
}

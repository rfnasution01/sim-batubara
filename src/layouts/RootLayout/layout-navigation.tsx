import {
  IconBack,
  IconDashboard,
  IconDown,
  IconLayout,
  IconList,
  IconUp,
  IconUser,
} from '@/assets'
import { useState } from 'react'
import clsx from 'clsx'
import Bg from '@/assets/ImgBatubara.png'

export function LayoutNavigation() {
  const icons = [
    { component: <IconDashboard size={24} />, name: 'Dashboard', child: [] },
    {
      component: <IconUser size={24} />,
      name: 'Kepegawaian',
      child: [
        {
          name: 'PNS',
        },
        {
          name: 'PPPK',
        },
      ],
    },
    { component: <IconLayout size={24} />, name: 'Tabel Referensi', child: [] },
    { component: <IconBack size={24} />, name: 'Logout', child: [] },
  ]

  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowChild, setIsShowChild] = useState<boolean>(false)

  return (
    <div
      className="flex flex-col items-center gap-32 bg-white py-32"
      onMouseEnter={() => {
        setIsShow(true)
      }}
      onMouseLeave={() => {
        setIsShow(false)
      }}
    >
      <div className="itesm-center flex justify-center px-32">
        <div className="flex items-center justify-center rounded-2xl p-16">
          <img
            src={isShow ? Bg : '/img/batubara.png'}
            alt="batubara"
            loading="lazy"
            className={clsx('filter', {
              'h-[4rem] w-[3rem] object-cover': !isShow,
              'h-[4rem] w-[20rem]': isShow,
            })}
          />
        </div>
      </div>
      {icons.map((icon, idx) => (
        <div className="flex w-full flex-col items-center gap-32" key={idx}>
          <div
            className={clsx('flex w-full px-32', {
              'justify-center': !isShow,
              'justify-start': isShow,
            })}
          >
            <div
              className={clsx(
                'flex items-center rounded-2xl p-16 hover:cursor-pointer hover:bg-sim-pale-primary',
                {
                  'w-auto justify-center': !isShow,
                  'w-[30rem] justify-start': isShow,
                },
              )}
            >
              <div className="flex w-full items-center gap-12">
                <span>{icon.component}</span>
                {isShow && (
                  <div
                    className="flex flex-1 items-center justify-between gap-12"
                    onClick={() => setIsShowChild(!isShowChild)}
                  >
                    <p>{icon?.name}</p>
                    {icon?.child?.length > 0 && (
                      <span>{isShowChild ? <IconUp /> : <IconDown />}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {icon?.child?.length > 0 && isShowChild && isShow && (
            <div className="flex flex-col gap-12">
              {icon?.child?.map((list, index) => (
                <div className="w-fullpx-32 flex" key={index}>
                  <div
                    className={clsx(
                      'flex items-center rounded-2xl p-16 hover:cursor-pointer hover:bg-sim-pale-primary',
                      {
                        'w-[30rem] justify-start': isShow,
                      },
                    )}
                  >
                    <div className="flex w-full items-center gap-12 px-32">
                      <span>
                        <IconList />
                      </span>
                      <div className="flex flex-1 items-center justify-between gap-12">
                        <p>{list?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(idx === 0 || idx === icons?.length - 2) && (
            <hr className="w-full border border-sim-pale-grey" />
          )}
        </div>
      ))}
    </div>
  )
}

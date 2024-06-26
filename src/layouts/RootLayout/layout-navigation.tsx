import {
  IconBack,
  IconDashboard,
  IconDown,
  IconList,
  IconUp,
  IconUser,
} from '@/assets'
import { useState } from 'react'
import clsx from 'clsx'
import Bg from '@/assets/ImgBatubara.png'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { listNavigasi } from '@/libs/dummy/ListNavigasi'
import { usePathname } from '@/libs/hooks/usePathname'
import Cookies from 'js-cookie'
import { MenubarTableReferensi } from '@/components/MenubarComponent'

export function LayoutNavigation() {
  const { firstPathname, secondPathname } = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActivePage = (item: string) => {
    if (
      firstPathname === item ||
      (firstPathname === '' && item === 'dashboard') ||
      secondPathname === item ||
      (secondPathname === '' && item === 'pns')
    ) {
      return true
    }
    return false
  }

  const [isShow, setIsShow] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleIconClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div
      className="flex flex-col items-center gap-32 bg-white py-32"
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => {
        setIsShow(false)
        setIsMenuOpen(false)
      }}
    >
      <div className="flex items-center justify-center px-32">
        <div className="flex items-center justify-center rounded-2xl p-16">
          <img
            src={isShow ? Bg : '/img/batubara.png'}
            alt="batubara"
            loading="lazy"
            className={clsx('filter transition-all duration-500 ease-in-out', {
              'h-[5rem] w-[4rem] object-cover': !isShow,
              'h-[5rem] w-[20rem]': isShow,
            })}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-32">
        {listNavigasi.map((icon, idx) => (
          <div className="flex w-full flex-col items-center gap-32" key={idx}>
            <div
              className={clsx(
                'flex w-full px-32 transition-all duration-500 ease-in-out',
                {
                  'justify-center': !isShow,
                  'justify-start': isShow,
                },
              )}
            >
              <Link
                to={
                  icon?.name === 'Dashboard'
                    ? '/'
                    : `/${convertToSlug(icon?.name)}`
                }
                onClick={(e) => {
                  if (icon?.child?.length > 0) {
                    e.preventDefault()
                    e.stopPropagation()
                  }

                  handleIconClick(idx)
                }}
                className={clsx(
                  'flex items-center rounded-2xl p-16 text-[2.2rem] font-bold transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-sim-pale-primary',
                  {
                    'w-auto justify-center': !isShow,
                    'w-[30rem] justify-start': isShow,
                  },
                  {
                    'text-sim-grey': !isActivePage(convertToSlug(icon?.name)),
                    'bg-sim-pale-primary text-sim-dark  ': isActivePage(
                      convertToSlug(icon?.name),
                    ),
                  },
                )}
              >
                <div className="flex w-full items-center gap-24">
                  <span>
                    {icon?.name === 'Dashboard' ? (
                      <IconDashboard
                        fill2={
                          isActivePage(convertToSlug(icon?.name))
                            ? '#195EE5'
                            : '#7D95A1'
                        }
                      />
                    ) : icon?.name === 'Kepegawaian' ? (
                      <IconUser
                        fill2={
                          isActivePage(convertToSlug(icon?.name))
                            ? '#195EE5'
                            : '#7D95A1'
                        }
                      />
                    ) : (
                      <IconDashboard
                        fill2={
                          isActivePage(convertToSlug(icon?.name))
                            ? '#195EE5'
                            : '#7D95A1'
                        }
                      />
                    )}
                  </span>
                  {isShow && (
                    <div className="flex flex-1 items-center justify-between gap-12">
                      <p className="">{icon?.name}</p>
                      {icon?.child?.length > 0 && (
                        <span>
                          {activeIndex === idx ? <IconUp /> : <IconDown />}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </div>
            {icon?.child?.length > 0 && activeIndex === idx && isShow && (
              <div className="flex flex-col gap-12 transition-all duration-500 ease-in-out">
                {icon?.child?.map((list, index) => (
                  <div className="flex w-full px-32" key={index}>
                    <Link
                      to={`/${convertToSlug(listNavigasi?.[idx]?.name)}/${convertToSlug(list?.name)}`}
                      className={clsx(
                        'flex items-center rounded-2xl p-16 font-bold transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-sim-pale-primary',
                        {
                          'w-[30rem] justify-start': isShow,
                        },
                        {
                          'text-sim-grey': !isActivePage(
                            convertToSlug(list?.name),
                          ),
                          'text-sim-primary': isActivePage(
                            convertToSlug(list?.name),
                          ),
                        },
                      )}
                    >
                      <div className="flex w-full items-center gap-24 px-32">
                        <span>
                          <IconList
                            fill2={
                              isActivePage(convertToSlug(list?.name))
                                ? '#195EE5'
                                : '#7D95A1'
                            }
                          />
                        </span>
                        <div className="flex flex-1 items-center justify-between gap-12">
                          <p>{list?.name}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {idx === 0 && <hr className="w-full border border-sim-pale-grey" />}
          </div>
        ))}
        <div
          className={clsx(
            'flex w-full px-32 transition-all duration-500 ease-in-out',
            {
              'justify-center': !isShow,
              'justify-start': isShow,
            },
          )}
        >
          <div
            className={clsx(
              'flex items-center rounded-2xl p-16 text-[2.2rem] font-bold transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-sim-pale-primary',
              {
                'w-auto justify-center': !isShow,
                'w-[30rem] justify-start': isShow,
              },
            )}
            onClick={handleMenuClick}
          >
            <MenubarTableReferensi isShow={isShow} isMenuOpen={isMenuOpen} />
          </div>
        </div>
        <hr className="w-full border border-sim-pale-grey" />
        <div
          className={clsx(
            'flex w-full px-32 transition-all duration-500 ease-in-out',
            {
              'justify-center': !isShow,
              'justify-start': isShow,
            },
          )}
        >
          <Link
            to={'/login'}
            onClick={() => {
              Cookies.remove('token')
            }}
            className={clsx(
              'flex items-center rounded-2xl p-16 text-[2.2rem] font-bold text-sim-grey transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-sim-pale-primary',
              {
                'w-auto justify-center': !isShow,
                'w-[30rem] justify-start': isShow,
              },
            )}
          >
            <div className="flex w-full items-center gap-24">
              <span>
                <IconBack />
              </span>
              {isShow && (
                <div className="flex flex-1 items-center justify-between gap-12">
                  <p className="">Logout</p>
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

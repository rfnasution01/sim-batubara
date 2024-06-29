import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '../Menubar'
import { IconDown, IconLayout } from '@/assets'
import { Link } from 'react-router-dom'
import { ListDataTableReferensi } from '@/libs/dummy/ListDataTableReferensi'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'

export function MenubarTableReferensi({
  isShow,
  isMenuOpen,
  isHeader,
}: {
  isShow: boolean
  isMenuOpen: boolean
  isHeader?: boolean
}) {
  const { firstPathname, secondPathname } = usePathname()

  const isActivePage = (item: string) => {
    if (firstPathname === item || secondPathname === item) {
      return true
    }
    return false
  }

  return (
    <Menubar className="w-full">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
        >
          {isHeader ? (
            <div className="flex w-full items-center justify-between rounded-2xl border border-sim-pale-grey p-16 text-left text-sim-dark">
              <p>{convertSlugToText(secondPathname)}</p>
              <IconDown size={16} />
            </div>
          ) : (
            <div
              className={clsx(
                'flex w-full items-center gap-24 rounded-2xl text-[2.2rem]  font-bold  transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-sim-pale-primary',
                {
                  'text-sim-grey': !isActivePage(
                    convertToSlug('Tabel Referensi'),
                  ),
                  'bg-sim-pale-primary text-sim-dark': isActivePage(
                    convertToSlug('Tabel Referensi'),
                  ),
                },
              )}
            >
              <span>
                <IconLayout
                  fill2={
                    isActivePage(convertToSlug('Tabel Referensi'))
                      ? '#195EE5'
                      : '#7D95A1'
                  }
                />
              </span>
              {isShow && (
                <div className="flex flex-1 items-center justify-between gap-12">
                  <p className="">Tabel Referensi</p>
                </div>
              )}
            </div>
          )}
        </MenubarTrigger>
        {isMenuOpen && isShow && (
          <MenubarContent className="shadow-grey-light-1 absolute -left-[2rem] top-[1rem] z-50 w-[130rem] rounded-3x text-[2rem] transition-all duration-300">
            <div className="grid grid-cols-4 bg-white p-32">
              {ListDataTableReferensi.map((item) => (
                <Link
                  to={`/tabel-referensi/${convertToSlug(item)}`}
                  className={clsx(
                    'px-32 py-16 transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-sim-pale-primary',
                    {
                      'text-sim-grey': !isActivePage(convertToSlug(item)),
                      'bg-sim-pale-primary text-sim-dark': isActivePage(
                        convertToSlug(item),
                      ),
                    },
                  )}
                >
                  {item}
                </Link>
              ))}
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}

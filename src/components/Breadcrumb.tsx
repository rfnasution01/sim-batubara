import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Breadcrumb({ length }: { length: number }) {
  const { firstPathname, secondPathname } = usePathname()

  const navigate = useNavigate()

  return (
    <div
      className={clsx('', {
        'w-full rounded-2x bg-white p-32': length > 3,
      })}
    >
      {length <= 3 ? (
        <p className="text-[4rem] font-bold">
          {convertSlugToText(firstPathname)}{' '}
          <span
            className={clsx('', {
              uppercase: firstPathname === 'kepegawaian',
            })}
          >
            {convertSlugToText(secondPathname)}
          </span>
        </p>
      ) : (
        <div className="flex items-center gap-48">
          <p
            onClick={() => {
              navigate(-1)
            }}
            className="rounded-2xl border border-sim-dark px-24 py-16 text-sim-dark hover:cursor-pointer hover:bg-sim-dark hover:text-white"
          >
            Kembali
          </p>
          {secondPathname === 'pns' && (
            <div className="flex items-center gap-12 text-sim-grey">
              <p
                className="hover:cursor-pointer"
                onClick={() => {
                  navigate(-1)
                }}
              >
                Kepegawaian
              </p>
              <span>
                <ChevronRight size={16} />
              </span>
              {length === 5 ? (
                <p className="text-sim-primary hover:cursor-not-allowed">
                  Tambah Data
                </p>
              ) : (
                <p className="text-sim-primary hover:cursor-not-allowed">
                  Detail Data Pegawai
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'

export function Breadcrumb() {
  const { firstPathname, secondPathname } = usePathname()
  return (
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
  )
}

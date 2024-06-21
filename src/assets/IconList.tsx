import { IconType } from '@/libs/type'

export function IconList({ size = '12', fill1, fill2 }: IconType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00015 -0.000161807L0 6L6.00015 12.0002L12.0003 6L6.00015 -0.000161807Z"
        fill={fill2 ?? '#7D95A1'}
      />
    </svg>
  )
}

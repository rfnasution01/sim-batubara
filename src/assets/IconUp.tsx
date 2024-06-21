import { IconType } from '@/libs/type'

export function IconUp({ width = '14', height = '7', fill1, fill2 }: IconType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7H14L7.707 0.707C7.51947 0.519529 7.26516 0.414213 7 0.414213C6.73484 0.414213 6.48053 0.519529 6.293 0.707L0 7Z"
        fill={fill2 ?? '#1F475C'}
      />
    </svg>
  )
}

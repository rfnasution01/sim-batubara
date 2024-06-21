import { IconType } from '@/libs/type'

export function IconDown({
  width = '14',
  height = '7',
  fill1,
  fill2,
}: IconType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H14L7.707 6.293C7.51947 6.48047 7.26516 6.58579 7 6.58579C6.73484 6.58579 6.48053 6.48047 6.293 6.293L0 0Z"
        fill={fill2 ?? '#7D95A1'}
      />
    </svg>
  )
}

import { IconType } from '@/libs/type'

export function IconDocument({ width, height, fill1, fill3 }: IconType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.707 3H7.5V0.793L9.707 3ZM10 4V12.5H0V2C0 1.60218 0.158035 1.22064 0.43934 0.93934C0.720644 0.658035 1.10218 0.5 1.5 0.5L6.5 0.5V4H10ZM2.5 8.5H6V7.5H2.5V8.5ZM7.5 9.5H2.5V10.5H7.5V9.5ZM7.5 5.5H2.5V6.5H7.5V5.5Z"
        fill={fill3 ?? 'white'}
      />
    </svg>
  )
}

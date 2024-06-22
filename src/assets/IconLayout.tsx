import { IconType } from '@/libs/type'

export function IconLayout({ size = '24', fill1, fill2, fill3 }: IconType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_3841)">
        <path
          d="M6.5 17.5004H0V21.0004C0 21.796 0.31607 22.5591 0.87868 23.1217C1.44129 23.6843 2.20435 24.0004 3 24.0004H6.5V17.5004Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M24 17.5004H17.5V24.0004H21C21.7956 24.0004 22.5587 23.6843 23.1213 23.1217C23.6839 22.5591 24 21.796 24 21.0004V17.5004Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M6.5 8.74976H0V15.2497H6.5V8.74976Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M24 8.74976H17.5V15.2497H24V8.74976Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M6.5 0H3C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.31607 1.44129 0 2.20435 0 3L0 6.5H6.5V0Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M15.25 17.5004H8.75V24.0004H15.25V17.5004Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M15.25 8.74976H8.75V15.2497H15.25V8.74976Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path d="M15.25 0H8.75V6.5H15.25V0Z" fill={fill2 ?? '#7D95A1'} />
        <path
          d="M21 0H17.5V6.5H24V3C24 2.20435 23.6839 1.44129 23.1213 0.87868C22.5587 0.31607 21.7956 0 21 0V0Z"
          fill={fill2 ?? '#7D95A1'}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_3841">
          <rect width={size} height={size} fill={fill3 ?? 'white'} />
        </clipPath>
      </defs>
    </svg>
  )
}

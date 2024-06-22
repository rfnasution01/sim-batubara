import { IconType } from '@/libs/type'

export function IconDashboard({ size = '24', fill1, fill2, fill3 }: IconType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_3830)">
        <path
          d="M9.24435 7.82987C10.0616 7.28859 11.0201 6.99995 12.0003 6.99995C12.9806 6.99995 13.9391 7.28859 14.7563 7.82987L19.7443 2.84187C17.5812 1.00711 14.8368 0 12.0003 0C9.16386 0 6.41952 1.00711 4.25635 2.84187L9.24435 7.82987Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M21.1579 4.25574L16.1699 9.24374C16.7112 10.061 16.9998 11.0195 16.9998 11.9997C16.9998 12.98 16.7112 13.9385 16.1699 14.7557L21.1579 19.7437C22.9927 17.5806 23.9998 14.8362 23.9998 11.9997C23.9998 9.16325 22.9927 6.41891 21.1579 4.25574Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M14.7563 16.17C13.9391 16.7113 12.9806 17 12.0003 17C11.0201 17 10.0616 16.7113 9.24435 16.17L4.25635 21.158C6.41952 22.9928 9.16386 23.9999 12.0003 23.9999C14.8368 23.9999 17.5812 22.9928 19.7443 21.158L14.7563 16.17Z"
          fill={fill2 ?? '#7D95A1'}
        />
        <path
          d="M7.82987 14.7557C7.28859 13.9385 6.99995 12.98 6.99995 11.9997C6.99995 11.0195 7.28859 10.061 7.82987 9.24374L2.84187 4.25574C1.00711 6.41891 0 9.16325 0 11.9997C0 14.8362 1.00711 17.5806 2.84187 19.7437L7.82987 14.7557Z"
          fill={fill2 ?? '#7D95A1'}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_3830">
          <rect width={size} height={size} fill={fill3 ?? 'white'} />
        </clipPath>
      </defs>
    </svg>
  )
}

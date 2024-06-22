import { IconType } from '@/libs/type'

export function IconBack({ size = '20', fill1, fill2, fill3 }: IconType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_3858)">
        <path
          d="M23.9999 23.9994H21.9999C21.9978 22.1435 21.2596 20.3643 19.9473 19.052C18.635 17.7397 16.8558 17.0015 14.9999 16.9994H10.1699V23.4134L0.876895 14.1204C0.314481 13.5578 -0.00146484 12.7949 -0.00146484 11.9994C-0.00146484 11.2039 0.314481 10.441 0.876895 9.87839L10.1699 0.585388V6.99939H14.9999C17.386 7.00203 19.6737 7.9511 21.3609 9.63835C23.0482 11.3256 23.9973 13.6133 23.9999 15.9994V23.9994Z"
          fill={fill2 ?? '#E00000'}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_3858">
          <rect width={size} height={size} fill={fill3 ?? 'white'} />
        </clipPath>
      </defs>
    </svg>
  )
}

import { IconType } from '@/libs/type'

export function IconUser({ size = '24', fill1, fill2, fill3 }: IconType) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill1 ?? 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_3820)">
        <path
          d="M16.043 14.0006H7.957C6.64281 14.0022 5.3829 14.525 4.45363 15.4542C3.52435 16.3835 3.00159 17.6434 3 18.9576V24.0006H21V18.9576C20.9984 17.6434 20.4756 16.3835 19.5464 15.4542C18.6171 14.525 17.3572 14.0022 16.043 14.0006Z"
          fill={fill2 ?? '#195EE5'}
        />
        <path
          d="M12 12C15.3137 12 18 9.31371 18 6C18 2.68629 15.3137 0 12 0C8.68629 0 6 2.68629 6 6C6 9.31371 8.68629 12 12 12Z"
          fill={fill2 ?? '#195EE5'}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_3820">
          <rect width={size} height={size} fill={fill3 ?? 'white'} />
        </clipPath>
      </defs>
    </svg>
  )
}

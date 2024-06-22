import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------
export const RootLayoutMain = loadable(() => import('@/layouts/RootLayout'))
export const KepegawaianLayoutMain = loadable(
  () => import('@/layouts/KepegawaianLayout'),
)
export const DetailPegawaiLayoutMain = loadable(
  () => import('@/layouts/DetailPegawaiLayout'),
)
export const CustomLayoutMain = loadable(() => import('@/layouts/CustomLayout'))
export const LoginLayoutMain = loadable(() => import('@/layouts/LoginLayout'))

// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/ComingSoon'))
export const PNSPage = loadable(() => import('@/pages/PNS'))

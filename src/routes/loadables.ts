import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------
export const RootLayoutMain = loadable(() => import('@/layouts/RootLayout'))
export const KepegawaianLayoutMain = loadable(
  () => import('@/layouts/KepegawaianLayout'),
)

// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/ComingSoon'))

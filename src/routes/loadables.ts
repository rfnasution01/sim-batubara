import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------
export const RootLayoutMain = loadable(() => import('@/layouts/RootLayout'))
// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/ComingSoon'))

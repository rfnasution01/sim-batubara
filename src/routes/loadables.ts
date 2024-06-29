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
export const TabelReferensiLayout = loadable(
  () => import('@/layouts/TableReferensiLayout'),
)

// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/ComingSoon'))
export const PNSPage = loadable(() => import('@/pages/PNS'))
export const TambahJabatanPage = loadable(
  () => import('@/pages/Tambah/TambahJabatan'),
)
export const TambahKursusPage = loadable(
  () => import('@/pages/Tambah/TambahKursus'),
)
export const TambahDiklatPage = loadable(
  () => import('@/pages/Tambah/TambahDiklat'),
)
export const TambahPenghargaanPage = loadable(
  () => import('@/pages/Tambah/TambahPenghargaan'),
)
export const DetailJabatanPage = loadable(
  () => import('@/pages/Detail/DetailJabatan'),
)
export const DetailDiklatPage = loadable(
  () => import('@/pages/Detail/DetailDiklat'),
)
export const DetailKursusPage = loadable(
  () => import('@/pages/Detail/DetailKursus'),
)
export const DetailPenghargaanPage = loadable(
  () => import('@/pages/Detail/DetailPenghargaan'),
)

export const DashboardPage = loadable(() => import('@/pages/Dashboard'))

export const TabelReferensiPathPage = loadable(
  () => import('@/pages/TabelReferensi'),
)

export const DetailAngkaKreditPathPage = loadable(
  () => import('@/pages/Detail/DetailKredit'),
)
export const TambahAngkaKreditPathPage = loadable(
  () => import('@/pages/Tambah/TambahKredit'),
)

export const PPKPage = loadable(() => import('@/pages/PPPK'))

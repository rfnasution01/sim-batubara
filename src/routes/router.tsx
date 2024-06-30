import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CustomLayoutMain,
  DashboardPage,
  DetailAngkaKreditPathPage,
  DetailDiklatPage,
  DetailJabatanPage,
  DetailKursusPage,
  DetailPegawaiLayoutMain,
  DetailPenghargaanPage,
  KepegawaianLayoutMain,
  LoginLayoutMain,
  PNSPage,
  PPKPage,
  RootLayoutMain,
  TabelReferensiLayout,
  TabelReferensiPathPage,
  TambahAngkaKreditPathPage,
  TambahDiklatPage,
  TambahJabatanPage,
  TambahKursusPage,
  TambahPenghargaanPage,
} from './loadables'
import Cookies from 'js-cookie'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutMain />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (!jwtPayload) {
        return redirect('/login')
      }

      return null
    },
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'tabel-referensi',
        element: <TabelReferensiLayout />,
        children: [
          {
            path: ':path',
            element: <TabelReferensiPathPage />,
          },
        ],
      },
      {
        path: 'kepegawaian',
        element: <KepegawaianLayoutMain />,
        children: [
          {
            path: '',
            element: <PNSPage />,
          },
          {
            path: 'pns',
            element: <CustomLayoutMain />,
            children: [
              {
                path: '',
                element: <PNSPage />,
              },
              {
                path: ':nama',
                element: <DetailPegawaiLayoutMain />,
              },
              {
                path: ':nama/jabatan/:aksi',
                element: <TambahJabatanPage />,
              },
              {
                path: ':nama/diklat/:aksi',
                element: <TambahDiklatPage />,
              },
              {
                path: ':nama/kursus/:aksi',
                element: <TambahKursusPage />,
              },
              {
                path: ':nama/penghargaan/:aksi',
                element: <TambahPenghargaanPage />,
              },
              {
                path: ':nama/angka-kredit/:aksi',
                element: <TambahAngkaKreditPathPage />,
              },
              {
                path: ':nama/jabatan/detail',
                element: <DetailJabatanPage />,
              },
              {
                path: ':nama/diklat/detail',
                element: <DetailDiklatPage />,
              },
              {
                path: ':nama/kursus/detail',
                element: <DetailKursusPage />,
              },
              {
                path: ':nama/penghargaan/detail',
                element: <DetailPenghargaanPage />,
              },
              {
                path: ':nama/angka-kredit/detail',
                element: <DetailAngkaKreditPathPage />,
              },
            ],
          },
          {
            path: 'pppk',
            element: <CustomLayoutMain />,
            children: [
              {
                path: '',
                element: <PPKPage />,
              },
              {
                path: ':nama',
                element: <DetailPegawaiLayoutMain />,
              },
              {
                path: ':nama/jabatan/:aksi',
                element: <TambahJabatanPage />,
              },
              {
                path: ':nama/diklat/:aksi',
                element: <TambahDiklatPage />,
              },
              {
                path: ':nama/kursus/:aksi',
                element: <TambahKursusPage />,
              },
              {
                path: ':nama/penghargaan/:aksi',
                element: <TambahPenghargaanPage />,
              },
              {
                path: ':nama/angka-kredit/:aksi',
                element: <TambahAngkaKreditPathPage />,
              },
              {
                path: ':nama/jabatan/detail',
                element: <DetailJabatanPage />,
              },
              {
                path: ':nama/diklat/detail',
                element: <DetailDiklatPage />,
              },
              {
                path: ':nama/kursus/detail',
                element: <DetailKursusPage />,
              },
              {
                path: ':nama/penghargaan/detail',
                element: <DetailPenghargaanPage />,
              },
              {
                path: ':nama/angka-kredit/detail',
                element: <DetailAngkaKreditPathPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <LoginLayoutMain />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (jwtPayload) {
        return redirect('/')
      }

      return null
    },
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])

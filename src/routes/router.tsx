import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CustomLayoutMain,
  DashboardPage,
  DetailDiklatPage,
  DetailJabatanPage,
  DetailKursusPage,
  DetailPegawaiLayoutMain,
  DetailPenghargaanPage,
  KepegawaianLayoutMain,
  LoginLayoutMain,
  PNSPage,
  RootLayoutMain,
  TabelReferensiLayout,
  TabelReferensiPathPage,
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
                path: ':nama/jabatan/tambah',
                element: <TambahJabatanPage />,
              },
              {
                path: ':nama/diklat/tambah',
                element: <TambahDiklatPage />,
              },
              {
                path: ':nama/kursus/tambah',
                element: <TambahKursusPage />,
              },
              {
                path: ':nama/penghargaan/tambah',
                element: <TambahPenghargaanPage />,
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
            ],
          },
          {
            path: 'pppk',
            element: <ComingSoonPage />,
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

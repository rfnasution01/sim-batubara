import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CustomLayoutMain,
  DetailPegawaiLayoutMain,
  KepegawaianLayoutMain,
  LoginLayoutMain,
  PNSPage,
  RootLayoutMain,
  TambahPage,
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
        element: <ComingSoonPage />,
      },
      {
        path: 'tabel-referensi',
        element: <ComingSoonPage />,
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
                path: ':nama/:jenis/tambah',
                element: <TambahPage />,
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

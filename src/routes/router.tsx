import { createBrowserRouter } from 'react-router-dom'
import {
  ComingSoonPage,
  CustomLayoutMain,
  DetailPegawaiLayoutMain,
  KepegawaianLayoutMain,
  LoginLayoutMain,
  PNSPage,
  RootLayoutMain,
} from './loadables'

// const categories = ['berita', 'pengumuman', 'agenda', 'prestasi']

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutMain />,
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
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])

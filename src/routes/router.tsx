import { createBrowserRouter } from 'react-router-dom'
import { ComingSoonPage, RootLayoutMain } from './loadables'

// const categories = ['berita', 'pengumuman', 'agenda', 'prestasi']

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutMain />,
    // children: [
    //   {
    //     path: '',
    //     element: <HomePage />,
    //   },

    //   {
    //     path: 'halaman/page/:id',
    //     element: <HalamanPage />,
    //   },
    //   {
    //     path: 'tentang-kami',
    //     element: <TentangKamiPage />,
    //   },
    //   {
    //     path: 'program',
    //     element: <ProgramPage />,
    //   },
    //   {
    //     path: 'direktori',
    //     element: <DirektoriPage />,
    //   },
    //   {
    //     path: 'program-details/page/:id',
    //     element: <ProgramDetailPage />,
    //   },
    //   {
    //     path: 'faq',
    //     element: <FaqPage />,
    //   },
    //   {
    //     path: 'profil',
    //     element: <ProfilPage />,
    //   },
    //   {
    //     path: 'organisasi',
    //     element: <OrganizationPage />,
    //   },
    //   {
    //     path: 'galeri-detail/page/:id',
    //     element: <GaleriPage />,
    //   },

    //   {
    //     path: 'testimonial',
    //     element: <TestimonialPage />,
    //   },
    //   {
    //     path: 'testimonial/page/:id',
    //     element: <TestimonialDetailPage />,
    //   },

    //   ...categories.flatMap((category) => [
    //     { path: category, element: <RouteLayout /> },
    //     { path: `${category}/:kategori`, element: <KategoriLayout /> },
    //     { path: `${category}/page/:id`, element: <DetailLayout /> },
    //   ]),
    // ],
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])

import {
  DataKepegawaianUtamaHeaderType,
  DataKepegawaianUtamaSIASNType,
  PageInfoType,
} from '@/libs/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export type Meta = {
  page?: number
  limit?: number
  count?: number
  total?: number
  last_page?: number
}

export type Res<T, M = undefined> = {
  status: boolean
  message: string
  data: T
  related: T
  meta: Meta
  mapped?: M
  page_info?: PageInfoType
  header?: DataKepegawaianUtamaHeaderType
  siasn?: DataKepegawaianUtamaSIASNType
}

const baseURL = import.meta.env.VITE_BASE_URL

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: [
    'pegawai-pns',
    'pegawai-pns-utama',
    'sinkron-pns-utama',
    'riwayat-golongan',
    'riwayat-pendidikan',
    'riwayat-jabatan',
    'riwayat-diklat',
    'riwayat-diklat-lainnya',
    'riwayat-penghargan',
    'download-dokumen',
    'detail-jabatan',
    'detail-kursus',
    'detail-diklat',
    'detail-penghargaan',
    'pindah-instansi',
    'masa-kerja',
    'pindah-instansi',
    'dashboard',
    'angka-kredit',
    'detail-angka-kredit',
    'riwayat-dp3',
    'riwayat-keluarga',
    'riwayat-anak',
  ],
  // * it's okay to disable eslint here, because the warning is unnecessary. Each endpoint will be injected from an api slice.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
})

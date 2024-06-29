import {
  DataKepegawaianUtamaParams,
  GolonganType,
  JenisJabatanType,
  SatuanKerjaJabatanType,
  SatuanKerjaType,
} from '@/libs/type'
import { Res, api } from '../api'

export const SatuanKerjaEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSatuanKerja: builder.query<Res<SatuanKerjaType[]>, void>({
      query: () => ({
        url: `referensi/satker`,
        method: 'GET',
      }),
    }),
    getGolongan: builder.query<Res<GolonganType[]>, void>({
      query: () => ({
        url: `referensi/golongan`,
        method: 'GET',
      }),
    }),
    getJenisJabatan: builder.query<Res<JenisJabatanType[]>, void>({
      query: () => ({
        url: `referensi/jenis_jabatan`,
        method: 'GET',
      }),
    }),
    getSatuanKerjaJabatan: builder.query<Res<SatuanKerjaJabatanType[]>, void>({
      query: () => ({
        url: `referensi/satker_jabatan`,
        method: 'GET',
      }),
    }),
    getJenisDiklat: builder.query<Res<JenisJabatanType[]>, void>({
      query: () => ({
        url: `referensi/jenis_diklat`,
        method: 'GET',
      }),
    }),
    getJenisKursus: builder.query<Res<JenisJabatanType[]>, void>({
      query: () => ({
        url: `referensi/jenis_kursus`,
        method: 'GET',
      }),
    }),
    getJenisPenghargaan: builder.query<Res<JenisJabatanType[]>, void>({
      query: () => ({
        url: `referensi/jenis_penghargaan`,
        method: 'GET',
      }),
    }),
    getJenisPenghargaanFungsional: builder.query<
      Res<JenisJabatanType[]>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `referensi/jabatan_fungsional`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
    }),
  }),
})

export const {
  useGetSatuanKerjaQuery,
  useGetGolonganQuery,
  useGetJenisJabatanQuery,
  useGetSatuanKerjaJabatanQuery,
  useGetJenisDiklatQuery,
  useGetJenisKursusQuery,
  useGetJenisPenghargaanQuery,
  useGetJenisPenghargaanFungsionalQuery,
} = SatuanKerjaEndpoints

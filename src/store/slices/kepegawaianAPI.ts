import {
  DataKepegawaianParams,
  DataKepegawaianType,
  DataKepegawaianUtamaParams,
  DataKepegawaianUtamaType,
  RiwayatGolonganType,
} from '@/libs/type'
import { Res, api } from '../api'

export const KepegawaianEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getKepegawaianPNS: builder.query<
      Res<DataKepegawaianType[]>,
      DataKepegawaianParams
    >({
      query: ({
        page_number,
        page_size,
        search,
        id_organisasi,
        jabatan,
        id_golongan,
      }) => ({
        url: `kepegawaian/pns`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
          id_golongan: id_golongan,
          id_organisasi: id_organisasi,
          jabatan: jabatan,
        },
      }),
      providesTags: ['pegawai-pns'],
    }),
    getKepegawaianPNSUtama: builder.query<
      Res<DataKepegawaianUtamaType>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/pns_detail/utama`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'pegawai-pns-utama', id: id_pegawai },
      ],
    }),
    getSinkronPNSUtama: builder.query<void, DataKepegawaianUtamaParams>({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/sinkron/utama`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'sinkron-pns-utama', id: id_pegawai },
      ],
    }),
    getPNSRiwayatGolongan: builder.query<
      Res<RiwayatGolonganType[]>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/pns_detail/riwayat/golongan`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'riwayat-golongan', id: id_pegawai },
      ],
    }),
  }),
})

export const {
  useGetKepegawaianPNSQuery,
  useGetKepegawaianPNSUtamaQuery,
  useLazyGetSinkronPNSUtamaQuery,
  useGetPNSRiwayatGolonganQuery,
} = KepegawaianEndpoints

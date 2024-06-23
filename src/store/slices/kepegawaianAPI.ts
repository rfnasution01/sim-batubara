import {
  DataKepegawaianParams,
  DataKepegawaianType,
  DataKepegawaianUtamaParams,
  DataKepegawaianUtamaType,
  RiwayatGolonganType,
  RiwayatJabatanType,
  RiwayatPendidikanType,
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
    createSinkronPNSUtama: builder.mutation<
      void,
      { data: DataKepegawaianUtamaParams }
    >({
      query: ({ data }) => ({
        url: `kepegawaian/sinkron/utama`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['pegawai-pns-utama'],
    }),
    getPNSRiwayatGolongan: builder.query<
      Res<RiwayatGolonganType>,
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
    createSinkronRiwayatGolongan: builder.mutation<
      void,
      { data: DataKepegawaianUtamaParams }
    >({
      query: ({ data }) => ({
        url: `kepegawaian/sinkron/riwayat/golongan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['riwayat-golongan'],
    }),
    getPNSRiwayatPendidikan: builder.query<
      Res<RiwayatPendidikanType>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/pns_detail/riwayat/pendidikan`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'riwayat-pendidikan', id: id_pegawai },
      ],
    }),
    createSinkronRiwayatPendidikan: builder.mutation<
      void,
      { data: DataKepegawaianUtamaParams }
    >({
      query: ({ data }) => ({
        url: `kepegawaian/sinkron/riwayat/pendidikan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['riwayat-pendidikan'],
    }),
    getPNSRiwayatJabatan: builder.query<
      Res<RiwayatJabatanType>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/pns_detail/riwayat/jabatan`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'riwayat-jabatan', id: id_pegawai },
      ],
    }),
    createSinkronRiwayatJabatan: builder.mutation<
      void,
      { data: DataKepegawaianUtamaParams }
    >({
      query: ({ data }) => ({
        url: `kepegawaian/sinkron/riwayat/jabatan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['riwayat-jabatan'],
    }),
  }),
})

export const {
  useGetKepegawaianPNSQuery,
  useGetKepegawaianPNSUtamaQuery,
  useCreateSinkronPNSUtamaMutation,
  useGetPNSRiwayatGolonganQuery,
  useCreateSinkronRiwayatGolonganMutation,
  useGetPNSRiwayatPendidikanQuery,
  useCreateSinkronRiwayatPendidikanMutation,
  useGetPNSRiwayatJabatanQuery,
  useCreateSinkronRiwayatJabatanMutation,
} = KepegawaianEndpoints

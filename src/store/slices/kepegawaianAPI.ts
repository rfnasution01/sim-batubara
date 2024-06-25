/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataKepegawaianDetailParams,
  DataKepegawaianParams,
  DataKepegawaianType,
  DataKepegawaianUtamaParams,
  DataKepegawaianUtamaType,
  DiklatDetailType,
  FileKepegawaianParams,
  JabatanDetailType,
  KursusDetailType,
  PenghargaanDetailType,
  RiwayatDiklatLainnyaType,
  RiwayatDiklatType,
  RiwayatGolonganType,
  RiwayatJabatanType,
  RiwayatPendidikanType,
  RiwayatPenghargaanType,
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
    getPNSRiwayatPindahInstansi: builder.query<
      Res<RiwayatJabatanType>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/pns_detail/riwayat/pindahinstansi`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'pindah-instansi', id: id_pegawai },
      ],
    }),
    getPNSRiwayatJabatanDetail: builder.query<
      Res<JabatanDetailType>,
      DataKepegawaianDetailParams
    >({
      query: ({ id }) => ({
        url: `kepegawaian/pns_riwayat/jabatan`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: (_res, _err, { id }) => [
        { type: 'detail-jabatan', id: id },
      ],
    }),
    getPNSRiwayatDiklatDetail: builder.query<
      Res<DiklatDetailType>,
      DataKepegawaianDetailParams
    >({
      query: ({ id }) => ({
        url: `kepegawaian/pns_riwayat/diklat`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: (_res, _err, { id }) => [{ type: 'detail-diklat', id: id }],
    }),
    getPNSRiwayatKursusDetail: builder.query<
      Res<KursusDetailType>,
      DataKepegawaianDetailParams
    >({
      query: ({ id }) => ({
        url: `kepegawaian/pns_riwayat/kursus`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: (_res, _err, { id }) => [{ type: 'detail-kursus', id: id }],
    }),
    getPNSRiwayatPenghargaanDetail: builder.query<
      Res<PenghargaanDetailType>,
      DataKepegawaianDetailParams
    >({
      query: ({ id }) => ({
        url: `kepegawaian/pns_riwayat/penghargaan`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
      providesTags: (_res, _err, { id }) => [
        { type: 'detail-penghargaan', id: id },
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
    getPNSRiwayatDiklat: builder.query<
      Res<RiwayatDiklatType>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/pns_detail/riwayat/diklat`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'riwayat-diklat', id: id_pegawai },
      ],
    }),
    createSinkronRiwayatDiklat: builder.mutation<
      void,
      { data: DataKepegawaianUtamaParams }
    >({
      query: ({ data }) => ({
        url: `kepegawaian/sinkron/riwayat/diklat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['riwayat-diklat'],
    }),
    getPNSRiwayatDiklatLainnya: builder.query<
      Res<RiwayatDiklatLainnyaType>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/pns_detail/riwayat/kursus`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'riwayat-diklat-lainnya', id: id_pegawai },
      ],
    }),
    createSinkronRiwayatDiklatLainnya: builder.mutation<
      void,
      { data: DataKepegawaianUtamaParams }
    >({
      query: ({ data }) => ({
        url: `kepegawaian/sinkron/riwayat/kursus`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['riwayat-diklat'],
    }),
    getPNSRiwayatPengharaagn: builder.query<
      Res<RiwayatPenghargaanType>,
      DataKepegawaianUtamaParams
    >({
      query: ({ id_pegawai }) => ({
        url: `kepegawaian/pns_detail/riwayat/penghargaan`,
        method: 'GET',
        params: {
          id_pegawai: id_pegawai,
        },
      }),
      providesTags: (_res, _err, { id_pegawai }) => [
        { type: 'riwayat-penghargan', id: id_pegawai },
      ],
    }),
    getDokumenKepegawaian: builder.query<File, FileKepegawaianParams>({
      query: ({ dok_uri }) => ({
        url: `kepegawaian/dokumen_download`,
        method: 'GET',
        params: {
          dok_uri: dok_uri,
        },
        responseHandler: 'content-type',
      }),
      providesTags: ['download-dokumen'],
    }),

    createSinkronRiwayatPenghargaan: builder.mutation<
      void,
      { data: DataKepegawaianUtamaParams }
    >({
      query: ({ data }) => ({
        url: `kepegawaian/sinkron/riwayat/penghargaan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['riwayat-penghargan'],
    }),
    createSavaJabatan: builder.mutation<Res<string>, { data: FormData }>({
      query: ({ data }) => ({
        url: `kepegawaian/pns_riwayat/jabatan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'riwayat-jabatan',
        'download-dokumen',
        'detail-jabatan',
      ],
    }),
    createSavaKursus: builder.mutation<Res<string>, { data: FormData }>({
      query: ({ data }) => ({
        url: `kepegawaian/pns_riwayat/kursus`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'riwayat-diklat-lainnya',
        'download-dokumen',
        'detail-kursus',
      ],
    }),
    createSavaDiklat: builder.mutation<Res<string>, { data: FormData }>({
      query: ({ data }) => ({
        url: `kepegawaian/pns_riwayat/diklat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['riwayat-diklat', 'download-dokumen', 'detail-diklat'],
    }),
    createSavaPenghargaan: builder.mutation<Res<string>, { data: FormData }>({
      query: ({ data }) => ({
        url: `kepegawaian/pns_riwayat/penghargaan`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'riwayat-penghargan',
        'download-dokumen',
        'detail-penghargaan',
      ],
    }),
    deleteJabatan: builder.mutation<void, DataKepegawaianDetailParams>({
      query: ({ id }) => ({
        url: `kepegawaian/pns_riwayat/jabatan/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['riwayat-jabatan', 'pegawai-pns-utama'],
    }),
    deleteDiklat: builder.mutation<void, DataKepegawaianDetailParams>({
      query: ({ id }) => ({
        url: `kepegawaian/pns_riwayat/diklat/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['riwayat-diklat', 'pegawai-pns-utama'],
    }),
    deleteKursus: builder.mutation<void, DataKepegawaianDetailParams>({
      query: ({ id }) => ({
        url: `kepegawaian/pns_riwayat/kursus/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['riwayat-diklat-lainnya', 'pegawai-pns-utama'],
    }),
    deletePenghargaan: builder.mutation<void, DataKepegawaianDetailParams>({
      query: ({ id }) => ({
        url: `kepegawaian/pns_riwayat/penghargaan/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['riwayat-penghargan', 'pegawai-pns-utama'],
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
  useGetPNSRiwayatDiklatQuery,
  useGetPNSRiwayatDiklatLainnyaQuery,
  useGetPNSRiwayatPengharaagnQuery,
  useCreateSinkronRiwayatDiklatLainnyaMutation,
  useCreateSinkronRiwayatDiklatMutation,
  useCreateSinkronRiwayatPenghargaanMutation,
  useCreateSavaJabatanMutation,
  useGetDokumenKepegawaianQuery,
  useCreateSavaKursusMutation,
  useCreateSavaDiklatMutation,
  useCreateSavaPenghargaanMutation,
  useGetPNSRiwayatJabatanDetailQuery,
  useDeleteJabatanMutation,
  useDeleteDiklatMutation,
  useGetPNSRiwayatDiklatDetailQuery,
  useDeleteKursusMutation,
  useDeletePenghargaanMutation,
  useGetPNSRiwayatKursusDetailQuery,
  useGetPNSRiwayatPenghargaanDetailQuery,
  useGetPNSRiwayatPindahInstansiQuery,
} = KepegawaianEndpoints

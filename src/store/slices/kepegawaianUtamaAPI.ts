import { api } from '../api'

export type UpdateDataUtamaParams = {
  id_pegawai: string
  id: string
  agamaId: string
  alamat: string
  email: string
  emailGov: string
  karis_karsu: string
  kelas_jabatan: string
  bpjs: string
  noHp: string
  noTelp: string
  noNpwp: string
  tglNpwp: string
  tanggal_taspen: string
  noTaspen: string
}

export const KepegawaianUtamaEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    updateDataUtama: builder.mutation<void, { body: UpdateDataUtamaParams }>({
      query: ({ body }) => ({
        url: `kepegawaian/edit/utama`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['pegawai-pns', 'pegawai-pns-utama'],
    }),
  }),
})

export const { useUpdateDataUtamaMutation } = KepegawaianUtamaEndpoints

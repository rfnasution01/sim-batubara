import { GolonganType, SatuanKerjaType } from '@/libs/type'
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
  }),
})

export const { useGetSatuanKerjaQuery, useGetGolonganQuery } =
  SatuanKerjaEndpoints

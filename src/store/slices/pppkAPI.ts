import { PPPKType } from '@/libs/type/DataPPPKType'
import { Res, api } from '../api'
import { DataKepegawaianParams } from '@/libs/type'

export const PPPKEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getPPPK: builder.query<Res<PPPKType[]>, DataKepegawaianParams>({
      query: ({
        page_number,
        page_size,
        search,
        id_organisasi,
        jabatan,
        id_golongan,
      }) => ({
        url: `kepegawaian/p3k`,
        method: 'GET',
        params: {
          page_number: page_number,
          id_organisasi: id_organisasi,
          page_size: page_size,
          search: search,
          jabatan: jabatan,
          id_golongan: id_golongan,
        },
      }),
      providesTags: ['dashboard'],
    }),
  }),
})

export const { useGetPPPKQuery } = PPPKEndpoints

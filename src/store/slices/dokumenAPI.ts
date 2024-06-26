import { api } from '../api'
import { FileKepegawaianParams } from '@/libs/type'

export const LoginEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDokumenKepegawaian: builder.query<File, FileKepegawaianParams>({
      query: ({ dok_uri }) => ({
        url: `kepegawaian/dokumen1_download`,
        method: 'GET',
        params: {
          dok_uri: dok_uri,
        },
        responseHandler: 'content-type',
      }),
      providesTags: ['download-dokumen'],
    }),
  }),
})

export const { useGetDokumenKepegawaianQuery } = LoginEndpoints

import { LoginParams, LoginType } from '@/libs/type/LoginType'
import { Res, api } from '../api'

export const LoginEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createLogin: builder.mutation<Res<LoginType>, { data: LoginParams }>({
      query: ({ data }) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'pegawai-pns',
        'pegawai-pns-utama',
        'sinkron-pns-utama',
        'riwayat-golongan',
      ],
    }),
  }),
})

export const { useCreateLoginMutation } = LoginEndpoints

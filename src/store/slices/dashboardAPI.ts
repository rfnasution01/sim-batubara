import { Res, api } from '../api'
import { DashboardParams, DashboardType } from '@/libs/type'

export const DashboardEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<Res<DashboardType>, DashboardParams>({
      query: ({ id_organisasi }) => ({
        url: `dashboard/pegawai`,
        method: 'GET',
        params: {
          id_organisasi: id_organisasi,
        },
      }),
      providesTags: ['dashboard'],
    }),
  }),
})

export const { useGetDashboardQuery } = DashboardEndpoints

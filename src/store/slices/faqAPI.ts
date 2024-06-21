import { api } from '../api'

export const FaqEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaqKategori: builder.query<void, void>({
      query: () => ({
        url: `website/faq_kategori`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetFaqKategoriQuery } = FaqEndpoints

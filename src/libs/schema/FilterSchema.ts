import zod from 'zod'

export const FilterSchema = zod.object({
  pageSize: zod.string().optional().nullable().nullish(),
})

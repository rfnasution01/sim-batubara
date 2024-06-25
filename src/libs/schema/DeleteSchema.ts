import zod from 'zod'

export const DeleteSchema = zod.object({
  id: zod.string().optional().nullable().nullish(),
})

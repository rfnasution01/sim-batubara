import zod from 'zod'

export const FilterSchema = zod.object({
  satuanKerja: zod.string().optional().nullable().nullish(),
  jabatan: zod.string().optional().nullable().nullish(),
  golongan: zod.string().optional().nullable().nullish(),
})

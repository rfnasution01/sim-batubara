import zod from 'zod'

export const SinkronSchema = zod.object({
  idPegawai: zod.string().optional().nullable().nullish(),
})

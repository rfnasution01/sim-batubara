import zod from 'zod'

export const TambahSchema = zod.object({
  jenisJabatan: zod.string({
    required_error: 'Jenis jabatan harus di isi',
    invalid_type_error: 'Format jenis jabatan tidak valid',
  }),
  namaUnor: zod.string({
    required_error: 'Satuan Kkerja harus di isi',
    invalid_type_error: 'Format satuan kerja tidak valid',
  }),
  namaJabatan: zod.string({
    required_error: 'Nama jabatan harus di isi',
    invalid_type_error: 'Format nama jabatan tidak valid',
  }),
  tmtJabatan: zod.string({
    required_error: 'TMT jabatan harus di isi',
    invalid_type_error: 'Format tmt jabatan tidak valid',
  }),
  nomorSk: zod.string({
    required_error: 'Nomor SK harus di isi',
    invalid_type_error: 'Format nomor SK tidak valid',
  }),
  tanggalSk: zod.string({
    required_error: 'Tanggal SK harus di isi',
    invalid_type_error: 'Format tanggal SK tidak valid',
  }),
  path: zod.string().optional().nullable().nullish(),
})

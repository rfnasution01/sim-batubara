import zod from 'zod'

export const TambahSchema = zod.object({
  jenisJabatan: zod.string({
    required_error: 'Jenis jabatan harus di isi',
    invalid_type_error: 'Format jenis jabatan tidak valid',
  }),
  jenisJabatanString: zod.string().optional().nullable().nullish(),
  satuanKerjaString: zod.string().optional().nullable().nullish(),
  namaJabatanString: zod.string().optional().nullable().nullish(),
  namaUnor: zod.string({
    required_error: 'Satuan Kerja harus di isi',
    invalid_type_error: 'Format satuan kerja tidak valid',
  }),
  tmtPelantikan: zod.string({
    required_error: 'TMT Pelantikan harus di isi',
    invalid_type_error: 'Format tmt pelantikan tidak valid',
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
  dokumen: zod.string().optional().nullable().nullish(),
  dokumensk: zod.string().optional().nullable().nullish(),
})

export const TambahDiklatSchema = zod.object({
  latihanStrukturalId: zod.string({
    required_error: 'Jenis diklat harus di isi',
    invalid_type_error: 'Format jenis diklat tidak valid',
  }),
  institusiPenyelenggara: zod.string({
    required_error: 'Institusi penyelenggara harus di isi',
    invalid_type_error: 'Format institusi penyelenggara tidak valid',
  }),
  nomor: zod.string({
    required_error: 'Nomor Sertifikat harus di isi',
    invalid_type_error: 'Format Nomor Sertifikat tidak valid',
  }),
  jam: zod.string({
    required_error: 'Jumlah jam harus di isi',
    invalid_type_error: 'Format jumlah jam tidak valid',
  }),
  tanggal: zod.string({
    required_error: 'Tanggal harus di isi',
    invalid_type_error: 'Format tanggal tidak valid',
  }),
  tanggalSelesai: zod.string({
    required_error: 'Tanggal selesai kursus harus di isi',
    invalid_type_error: 'Format tanggal selesai kursus tidak valid',
  }),
  dokumen: zod.string().optional().nullable().nullish(),
  jenisPenghargaanString: zod.string().optional().nullable().nullish(),
  latihanStrukturalIdString: zod.string().optional().nullable().nullish(),
})

export const TambahKursusSchema = zod.object({
  jenisKursus: zod.string({
    required_error: 'Jenis kursus harus di isi',
    invalid_type_error: 'Format jenis kursus tidak valid',
  }),
  institusiPenyelenggara: zod.string({
    required_error: 'Institusi penyelenggara harus di isi',
    invalid_type_error: 'Format institusi penyelenggara tidak valid',
  }),
  noSertipikat: zod.string({
    required_error: 'No sertifikat harus di isi',
    invalid_type_error: 'Format no sertifikat tidak valid',
  }),
  namaKursus: zod.string({
    required_error: 'Nama kursus harus di isi',
    invalid_type_error: 'Format nama kursus tidak valid',
  }),
  jam: zod.string({
    required_error: 'Jumlah jam harus di isi',
    invalid_type_error: 'Format jumlah jam tidak valid',
  }),
  tanggalKursus: zod.string({
    required_error: 'Tanggal kursus harus di isi',
    invalid_type_error: 'Format tanggal kursus tidak valid',
  }),
  tanggalSelesaiKursus: zod.string({
    required_error: 'Tanggal selesai kursus harus di isi',
    invalid_type_error: 'Format tanggal selesai kursus tidak valid',
  }),
  dokumen: zod.string().optional().nullable().nullish(),
  jenisKursusString: zod.string().optional().nullable().nullish(),
})

export const TambahPenghargaanSchema = zod.object({
  hargaId: zod.string({
    required_error: 'Jenis penghargaan harus di isi',
    invalid_type_error: 'Format jenis penghargaan tidak valid',
  }),
  skDate: zod.string({
    required_error: 'Tanggal harus di isi',
    invalid_type_error: 'Format tanggal tidak valid',
  }),
  skNomor: zod.string({
    required_error: 'Nomor SK harus di isi',
    invalid_type_error: 'Format nomor SK tidak valid',
  }),
  tahun: zod.string({
    required_error: 'Tahun harus di isi',
    invalid_type_error: 'Format tahun tidak valid',
  }),

  dokumen: zod.string().optional().nullable().nullish(),
  hargaIdString: zod.string().optional().nullable().nullish(),
})

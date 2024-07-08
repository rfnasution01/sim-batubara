import zod from 'zod'

export const TambahSchema = zod
  .object({
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
  .refine((values) => values.tanggalSk <= values.tmtJabatan, {
    message: 'TMT Jabatan tidak boleh lebih kecil dari tanggal SK',
    path: ['tmtJabatan'],
  })
  .refine((values) => values.tanggalSk <= values.tmtPelantikan, {
    message: 'TMT Pelantikan tidak boleh lebih kecil dari tanggal SK',
    path: ['tmtPelantikan'],
  })

export const TambahDiklatSchema = zod
  .object({
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
  .refine((values) => values.tanggal <= values.tanggalSelesai, {
    message: 'Tanggal selesai tidak boleh lebih kecil dari tanggal mulai',
    path: ['tanggalSelesai'],
  })

export const TambahKursusSchema = zod
  .object({
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
  .refine((values) => values.tanggalKursus <= values.tanggalSelesaiKursus, {
    message: 'Tanggal selesai tidak boleh lebih kecil dari tanggal mulai',
    path: ['tanggalSelesaiKursus'],
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

export const TambahAngkaKreditSchema = zod
  .object({
    id_riwayat_jabatan: zod.string({
      required_error: 'Riwayat jabatan harus di isi',
      invalid_type_error: 'Format riwayat jabatan SK tidak valid',
    }),
    bulanMulaiPenilaian: zod.string({
      required_error: 'Bulan mulai harus di isi',
      invalid_type_error: 'Format bulan mulai tidak valid',
    }),
    tahunMulaiPenilaian: zod.string({
      required_error: 'Tahun mulai harus di isi',
      invalid_type_error: 'Format tahun mulai tidak valid',
    }),
    bulanSelesaiPenilaian: zod.string({
      required_error: 'Bulan selesai harus di isi',
      invalid_type_error: 'Format bulan selesai tidak valid',
    }),
    tahunSelesaiPenilaian: zod.string({
      required_error: 'Tahun selesai harus di isi',
      invalid_type_error: 'Format tahun selesai tidak valid',
    }),
    isAngkaKreditPertama: zod.string({
      required_error: 'Kredit pertama harus di isi',
      invalid_type_error: 'Format kredit pertama selesai tidak valid',
    }),
    kreditUtamaBaru: zod.string({
      required_error: 'Kredit utama harus di isi',
      invalid_type_error: 'Format kredit utama tidak valid',
    }),
    kreditPenunjangBaru: zod.string({
      required_error: 'Kredit penunjang harus di isi',
      invalid_type_error: 'Format kredit penunjang tidak valid',
    }),
    kreditBaruTotal: zod.string({
      required_error: 'Kredit total harus di isi',
      invalid_type_error: 'Format kredit total tidak valid',
    }),
    nomorSK: zod.string({
      required_error: 'Nomor SK harus di isi',
      invalid_type_error: 'Format nomor SK tidak valid',
    }),
    tanggalSK: zod.string({
      required_error: 'Tanggal SK harus di isi',
      invalid_type_error: 'Format tanggal SK tidak valid',
    }),
    dokumen: zod.string().optional().nullable().nullish(),
    idRiwayatJabatanString: zod.string().optional().nullable().nullish(),
  })
  .refine(
    (values) =>
      values.tahunMulaiPenilaian !== values.tahunSelesaiPenilaian ||
      values.bulanMulaiPenilaian <= values.bulanSelesaiPenilaian,
    {
      message: 'Bulan selesai tidak boleh lebih kecil dari bulan mulai',
      path: ['bulanSelesaiPenilaian'],
    },
  )
  .refine(
    (values) => values.tahunMulaiPenilaian <= values.tahunSelesaiPenilaian,
    {
      message: 'Tahun selesai tidak boleh lebih kecil dari tahun mulai',
      path: ['tahunSelesaiPenilaian'],
    },
  )

  .refine(
    (values) =>
      Number(values?.kreditBaruTotal) ===
      Number(values?.kreditPenunjangBaru) + Number(values?.kreditUtamaBaru),
    {
      message:
        'Kredit total harus sama dengan penjumlahan kredit utama dan penunjang',
      path: ['kreditBaruTotal'],
    },
  )

export const EditDataUtamaSchema = zod.object({
  id: zod.string().optional().nullable().nullish(),
  agama_id: zod.string().optional().nullable().nullish(),
  agama: zod.string().optional().nullable().nullish(),
  alamat: zod.string().optional().nullable().nullish(),
  email: zod.string().email().optional().nullable().nullish(),
  emailGov: zod.string().email().optional().nullable().nullish(),
  karis_karsu: zod.string().optional().nullable().nullish(),
  kelas_jabatan: zod.string().optional().nullable().nullish(),
  bpjs: zod.string().optional().nullable().nullish(),
  noHp: zod.string().optional().nullable().nullish(),
  noTelp: zod.string().optional().nullable().nullish(),
  noNpwp: zod.string().optional().nullable().nullish(),
  tglNpwp: zod.string().optional().nullable().nullish(), // You may want to add more validation if it's a specific date format
  tanggal_taspen: zod.string().optional().nullable().nullish(), // You may want to add more validation if it's a specific date format
  noTaspen: zod.string().optional().nullable().nullish(),
})

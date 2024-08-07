export type DataKepegawaianType = {
  id_pegawai: string
  nip: string
  nama: string
  jk: string
  jabatan: string
  golongan: string
  hp: string
  satker: string
  photo?: string
  instansi?: string
}

export type DataKepegawaianParams = {
  page_number?: number
  page_size?: number
  search?: string
  id_organisasi?: string
  jabatan?: string
  id_golongan?: string
}

export type DataKepegawaianLokalType = {
  ID: string
  nip: string
  nama: string
  jenis_kelamin: string
  tempat_lahir: string
  tanggal_lahir: string
  agama: string
  alamat: string
  kelurahan: string
  kecamatan: string
  kabupaten: string
  provinsi: string
  kodepos: string
  hp: string
  email: string
  jenisJabatanId: string
}

export type DataKepegawaianSIASNType = {
  ID: string
  nip: string
  nama: string
  jenis_kelamin: string
  tempat_lahir: string
  tanggal_lahir: string
  agama: string
  alamat: string
  kelurahan: string
  kecamatan: string
  kabupaten: string
  provinsi: string
  kodepos: string
  hp: string
  email: string
  jenisJabatanId: string
}

export type DataKepegawaianUtamaType = {
  lokal: DataKepegawaianLokalType
  siasn: DataKepegawaianSIASNType
  last_update: string
}

export type DataKepegawaianUtamaSIASNType = {
  id: string
  nipBaru: string
  nipLama: string
  nama: string
  gelarDepan: string
  gelarBelakang: string
  tempatLahir: string
  tempatLahirId: string
  tglLahir: string
  agama: string
  agamaId: string
  email: string
  emailGov: string
  nik: string
  alamat: string
  noHp: string
  noTelp: string
  jenisPegawaiId: string
  mkTahun: number
  mkBulan: number
  jenisPegawaiNama: string
  kedudukanPnsId: string
  kedudukanPnsNama: string
  statusPegawai: string
  jenisKelamin: string
  jenisIdDokumenId: string
  jenisIdDokumenNama: string
  nomorIdDocument: string
  noSeriKarpeg: string
  tkPendidikanTerakhirId: string
  tkPendidikanTerakhir: string
  pendidikanTerakhirId: string
  pendidikanTerakhirNama: string
  tahunLulus: string
  tmtPns: string
  tmtPensiun: string | null
  bupPensiun: number
  tglSkPns: string
  tmtCpns: string
  tglSkCpns: string
  instansiIndukId: string
  instansiIndukNama: string
  satuanKerjaIndukId: string
  satuanKerjaIndukNama: string
  kanregId: string
  kanregNama: string
  instansiKerjaId: string
  instansiKerjaNama: string
  instansiKerjaKodeCepat: string
  satuanKerjaKerjaId: string
  satuanKerjaKerjaNama: string
  unorId: string
  unorNama: string
  unorIndukId: string
  unorIndukNama: string
  jenisJabatanId: string
  jenisJabatan: string
  jabatanNama: string
  jabatanStrukturalId: string
  jabatanStrukturalNama: string
  jabatanFungsionalId: string
  jabatanFungsionalNama: string
  jabatanFungsionalUmumId: string
  jabatanFungsionalUmumNama: string
  tmtJabatan: string
  lokasiKerjaId: string
  lokasiKerja: string
  golRuangAwalId: string
  golRuangAwal: string
  golRuangAkhirId: string
  golRuangAkhir: string
  tmtGolAkhir: string
  masaKerja: string
  eselon: string
  eselonId: string
  eselonLevel: string
  tmtEselon: string
  gajiPokok: string
  kpknId: string
  kpknNama: string
  ktuaId: string
  ktuaNama: string
  taspenId: string
  taspenNama: string
  jenisKawinId: string
  statusPerkawinan: string
  statusHidup: string
  tglSuratKeteranganDokter: string
  noSuratKeteranganDokter: string
  jumlahIstriSuami: number | null
  jumlahAnak: number | null
  noSuratKeteranganBebasNarkoba: string
  tglSuratKeteranganBebasNarkoba: string | null
  skck: string
  tglSkck: string | null
  akteKelahiran: string
  akteMeninggal: string
  tglMeninggal: string | null
  noNpwp: string
  tglNpwp: string
  noAskes: string
  bpjs: string
  kodePos: string
  noSpmt: string
  noTaspen: string
  bahasa: string
  kppnId: string
  kppnNama: string
  pangkatAkhir: string
  tglSttpl: string
  nomorSttpl: string
  nomorSkCpns: string
  nomorSkPns: string
  jenjang: string
  jabatanAsn: string
  kartuAsn: string
  validNik: boolean
  pangkatAwal: string
  asnJenjangJabatan: string
  kode_jenjang_jabatan: string
  levelJabatan: string
  tanggal_taspen: string
  tabrum2: string
  kelas_jabatan: string
  karis_karsu: string
}

export type DataKepegawaianUtamaHeaderType = {
  nama: string
  nip: string
  instansi: string
  satker: string
  photo: string
}

export type PenghargaanDetailType = {
  lokal: PenghargaanDetailsType
  siasn: PenghargaanDetailsType
  last_update: string
  user_update: string
}

export type PenghargaanDetailsType = {
  id: string
  tahun: string
  nomor: string
  tanggal: string
  nama: string
  path: string
}

export type DataKepegawaianUtamaParams = {
  id_pegawai: string
}

export type DataKepegawaianDetailParams = {
  id: string
}

export type FileKepegawaianParams = {
  dok_uri: string
}

export type PageInfoType = {
  last_page: number
  total: number
}

export type RiwayatGolonganType = {
  lokal: GolonganType[]
  siasn: GolonganType[]
  last_update: string
}

type GolonganType = {
  id: string
  golongan: string
  pangkat: string
  skNomor: string
  skTanggal: string
  tmtGolongan: string
  noPertekBkn: string
  tglPertekBkn: string
  masaKerjaGolonganTahun: string
  masaKerjaGolonganBulan: string
  path: string
}

export type RiwayatPendidikanType = {
  lokal: PendidikanType[]
  siasn: PendidikanType[]
  last_update: string
}

export type PendidikanType = {
  id: string
  pendidikanNama: string
  tglLulus: string
  nomorIjasah: string
  namaSekolah: string
  gelarDepan: string
  gelarBelakang: string
  tahunLulus: string
  path: string
}

export type RiwayatJabatanType = {
  lokal: JabatanType[]
  siasn: JabatanType[]
  last_update: string
}

export type RiwayatPMKType = {
  lokal: PMKType[]
  siasn: PMKType[]
  last_update: string
}

export type PMKType = {
  id: string
  idPns: string
  nipBaru: string
  nipLama: string
  pengalaman: string
  tanggalAwal: string
  tanggalSelesai: string
  nomorSk: string
  tanggalSk: string
  nomorBkn: string
  tanggalBkn: string
  masaKerjaTahun: string
  masaKerjaBulan: string
  dinilai: string
  path: string
}

export type RiwayatPindahInstansiType = {
  lokal: PindahInstansiType[]
  siasn: PindahInstansiType[]
  last_update: string
}

export type PindahInstansiType = {
  id: string
  instansiIndukLama: string
  instansiIndukBaru: string
  satuanKerjaLama: string
  satuanKerjaBaru: string
  jenisPegawai: string
  unorLama: string
  unorBaru: string
  skUsulNomor: string
  skUsulTanggal: string
  skAsalNomor: string
  skAsalTanggal: string
  jenisPi: string
  path: string
  skBknNomor: string
  skBknTanggal: string
  kpknBaru: string
}

export type JabatanDetailType = {
  lokal: JabatanDetailsType
  siasn: JabatanDetailsType
  last_update: string
  user_update: string
}

export type JabatanDetailsType = {
  id: string
  jenisJabatan: string
  satuanKerja: string
  namaJabatan: string
  tmtJabatan: string
  nomorSk: string
  tanggalSk: string
  tmtPelantikan: string
  eselon: string
  path: string
}

export type DiklatDetailType = {
  lokal: DiklatDetailsType
  siasn: DiklatDetailsType
  last_update: string
  user_update: string
}

export type DiklatDetailsType = {
  id: string
  latihanStrukturalNama: string
  nomor: string
  tahun: string
  tanggal: string
  tanggalSelesai: string
  jumlahJam: string
  institusiPenyelenggara: string
  path: string
}

export type JabatanType = {
  id: string
  jenisJabatan: string
  namaUnor: string
  namaJabatan: string
  tmtJabatan: string
  nomorSk: string
  tanggalSk: string
  tmtPelantikan: string
  dokumen: string
  dokumensk: string
  path: string
}

export type PostDiklatType = {
  jenisKursus: string
  institusiPenyelenggara: string
  noSertipikat: string
  namaKursus: string
  jam: string
  tanggalKursus: string
  tanggalSelesaiKursus: string
  dokumen: string
  path: string
}

export type RiwayatDiklatType = {
  lokal: DiklatType[]
  siasn: DiklatType[]
  last_update: string
}

export type DiklatType = {
  id: string
  latihanStrukturalNama: string
  tanggal: string
  tanggalSelesai: string
  institusiPenyelenggara: string
  path: string
}

export type RiwayatDiklatLainnyaType = {
  lokal: DiklatLainnyaType[]
  siasn: DiklatLainnyaType[]
  last_update: string
}

export type DiklatLainnyaType = {
  id: string
  jenisKursusSertifikat: string
  namaKursus: string
  tanggalKursus: string
  tanggalSelesaiKursus: string
  institusiPenyelenggara: string
  path: string
}

export type KursusDetailType = {
  lokal: KursusDetailsType
  siasn: KursusDetailsType
  last_update: string
  user_update: string
}

export type KursusDetailsType = {
  id: string
  jenisKursus: string
  namaKursus: string
  institusiPenyelenggara: string
  jumlahJam: string
  nomor: string
  tahun: string
  tanggal: string
  tanggalSelesai: string
  path: string
}

export type RiwayatPenghargaanType = {
  lokal: PenghargaanType[]
  siasn: PenghargaanType[]
  last_update: string
}

export type PenghargaanType = {
  id: string
  hargaNama: string
  tahun: string
  skNomor: string
  skDate: string
  path: string
}

export type DataSaveJabatanParams = {
  id_pegawai: string
  jenisJabatan: string
  namaUnor: string
  namaJabatan: string
  tmtJabatan: string
  nomorSk: string
  tanggalSk: string
}

export type PathFileType = {
  dok_id: string
  dok_nama: string
  dok_uri: string
  object: string
  slug: string
}

export type RiwayatAngkaKreditType = {
  lokal: AngkaKreditType[]
  siasn: AngkaKreditType[]
  last_update: string
}

export type RiwayatDetailAngkaKreditType = {
  lokal: AngkaKreditType
  siasn: AngkaKreditType
  last_update: string
  user_update: string
}

export type AngkaKreditType = {
  id: string
  nomorSk: string
  tanggalSk: string
  bulanMulaiPenilaian: string
  tahunMulaiPenilaian: string
  bulanSelesaiPenilaian: string
  tahunSelesaiPenilaian: string
  kreditUtamaBaru: string
  kreditPenunjangBaru: string
  kreditBaruTotal: string
  isAngkaKreditPertama: string
  namaJabatan: string
  Sumber: string
  path: string
}

export type RiwayatKeluargaType = {
  lokal: KeluargaType[]
  siasn: KeluargaType[]
  last_update: string
}

export type KeluargaType = {
  id: string
  nama: string
  tempatLahir: string
  tglLahir: string
  statusNikah: string
  tgglMenikah: string
}

export type RiwayatAnak = {
  lokal: AnakType[]
  siasn: AnakType[]
  last_update: string
}

export type AnakType = {
  id: string
  nama: string
  tempatLahir: string
  tglLahir: string
  jenisKelamin: string
  jenisAnak: string
}

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
}

export type DataKepegawaianUtamaType = {
  lokal: DataKepegawaianLokalType
  siasn: DataKepegawaianSIASNType
  last_update: string
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

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

export type DataKepegawaianUtamaParams = {
  id_pegawai: string
}

export type PageInfoType = {
  last_page: number
  total: number
}

export type RiwayatGolonganType = {
  lokal: GolonganType[]
  siasn: GolonganType[]
}

type GolonganType = {
  golongan: string
  pangkat: string
}
export type RiwayatPendidikanType = {
  lokal: PendidikanType[]
  siasn: PendidikanType[]
}

export type PendidikanType = {
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
}

export type JabatanType = {
  jenisJabatan: string
  namaUnor: string
  namaJabatan: string
  tmtJabatan: string
  nomorSk: string
  tanggalSk: string
  path: string
  tmtPelantikan: string
  dokumen: string
  dokumenSK: string
}

export type RiwayatDiklatType = {
  lokal: DiklatType[]
  siasn: DiklatType[]
}

export type DiklatType = {
  latihanStrukturalNama: string
  tanggal: string
  tanggalSelesai: string
  institusiPenyelenggara: string
  path: string
}

export type RiwayatDiklatLainnyaType = {
  lokal: DiklatLainnyaType[]
  siasn: DiklatLainnyaType[]
}

export type DiklatLainnyaType = {
  jenisKursusSertifikat: string
  namaKursus: string
  tanggalKursus: string
  tanggalSelesaiKursus: string
  institusiPenyelenggara: string
  path: string
}

export type RiwayatPenghargaanType = {
  lokal: PenghargaanType[]
  siasn: PenghargaanType[]
}

export type PenghargaanType = {
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

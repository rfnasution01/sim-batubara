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
}

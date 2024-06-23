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
  id: string
  idPns: string
  nipBaru: string
  nipLama: string
  golonganId: string
  golongan: string
  skNomor: string
  skTanggal: string
  tmtGolongan: string
  noPertekBkn: string
  tglPertekBkn: string
  jumlahKreditUtama: string
  jumlahKreditTambahan: string
  jenisKPId: string
  jenisKPNama: string
  masaKerjaGolonganTahun: string
  masaKerjaGolonganBulan: string
  path: {
    '858': {
      dok_id: '858'
      dok_nama: 'Dok SK KP'
      dok_uri: 'peremajaan/usulan/858_b377450f-7e8b-4adf-883e-f95cfc7be6f1.pdf'
      object: 'peremajaan/usulan/858_b377450f-7e8b-4adf-883e-f95cfc7be6f1.pdf'
      slug: '858'
    }
  }
  pangkat: string
}

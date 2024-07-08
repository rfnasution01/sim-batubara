export type SatuanKerjaType = {
  id: string
  kode: string
  nama: string
  id_parent: string
  urutan: string
}

export type GolonganType = {
  id: string
  nama: string
  pangkat: string
  urutan: string
}

export type JenisJabatanType = {
  id: string
  nama: string
  urutan?: string
}

export type SatuanKerjaJabatanType = {
  id: string
  nama_satker: string
  id_parent: string
  nama_jabatan: string
}

export type ChartType = {
  nama: string
  jlh: number
}

export type DashboardType = {
  jlhPegawai: string
  jlhSatker: string
  kategoriPegawai: ChartType[]
  jenisPegawai: ChartType[]
  golonganPegawai: ChartType[]
}

export type DashboardParams = {
  id_organisasi: string
}

export function DashboardJumlahPegawai({
  jumlahPegawai,
  jumlahSatuanKerja,
}: {
  jumlahPegawai: string
  jumlahSatuanKerja: string
}) {
  return (
    <div className="flex w-1/5 flex-col gap-24 rounded-2x bg-white p-32">
      <div className="flex flex-col gap-8">
        <p className="text-sim-grey">Jumlah Pegawai</p>
        <p className="text-[3.2rem] font-bold text-sim-dark">{jumlahPegawai}</p>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-sim-grey">Jumlah Satuan Kerja</p>
        <p className="text-[3.2rem] font-bold text-sim-dark">
          {jumlahSatuanKerja}
        </p>
      </div>
    </div>
  )
}

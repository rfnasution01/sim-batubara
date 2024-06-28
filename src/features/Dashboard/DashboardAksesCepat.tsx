import { Searching } from '@/components/Search'

export function DashboardAksesCepat() {
  return (
    <div className="flex flex-1 flex-col gap-24 rounded-2x bg-white p-32 text-sim-grey">
      <p>Akses Cepat</p>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <p>Cari Detail PNS</p>
          <Searching isDashboard pegawai="pns" />
        </div>
        <div className="flex flex-col gap-8">
          <p>Cari Detail PPPK</p>
          <Searching isDashboard pegawai="pppk" />
        </div>
      </div>
    </div>
  )
}

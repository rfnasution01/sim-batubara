import { IconDocument } from '@/assets'
import { LisdDataPegawai } from '@/libs/type'

export function ProfilPegawai({ data }: { data: LisdDataPegawai }) {
  const { photo, nama, nip, instansi, satuanKerja } = data
  return (
    <div className="rounded-2x flex items-start gap-48 bg-white p-32">
      {/* --- Profil --- */}
      <div className="rounded-2x h-[24rem] w-[24rem] border border-sim-pale-grey">
        <img
          src={photo}
          alt={nama}
          loading="lazy"
          className="rounded-2x h-full w-full object-cover filter"
        />
      </div>
      {/* --- Biodata --- */}
      <div className="flex h-full flex-1 items-center">
        <div className="flex flex-col gap-32">
          <p className="text-[4rem] font-bold text-sim-dark">{nama ?? '-'}</p>
          <div className="flex flex-col gap-16 font-semibold text-sim-dark">
            <p>NIP: {nip ?? '-'}</p>
            <p>Instansi: {instansi ?? '-'}</p>
            <p>Satuan Kerja: {satuanKerja ?? '-'}</p>
          </div>
        </div>
      </div>
      {/* --- Print --- */}
      <button
        type="button"
        className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-16 text-white"
      >
        <p>Cetak Profil</p>
        <span>
          <IconDocument width={10} height={13} />
        </span>
      </button>
    </div>
  )
}

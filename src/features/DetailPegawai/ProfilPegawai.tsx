import { IconDocument } from '@/assets'
import { DataKepegawaianUtamaHeaderType } from '@/libs/type'
import Profil from '@/assets/ImgProfil.png'

export function ProfilPegawai({
  data,
}: {
  data: DataKepegawaianUtamaHeaderType
}) {
  return (
    <div className="flex items-start gap-48 rounded-2x bg-white p-32">
      {/* --- Profil --- */}
      <div className="h-[24rem] w-[24rem] rounded-2x border border-sim-pale-grey">
        <img
          src={data?.photo ?? Profil}
          alt={data?.nama}
          loading="lazy"
          className="h-full w-full rounded-2x object-cover filter"
        />
      </div>
      {/* --- Biodata --- */}
      <div className="flex h-full flex-1 items-center">
        <div className="flex flex-col gap-32">
          <p className="text-[4rem] font-bold text-sim-dark">
            {data?.nama ?? '-'}
          </p>
          <div className="flex flex-col gap-16 font-semibold text-sim-dark">
            <p>NIP: {data?.nip ?? '-'}</p>
            <p>Instansi: {data?.instansi ?? '-'}</p>
            <p>Satuan Kerja: {data?.satker ?? '-'}</p>
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

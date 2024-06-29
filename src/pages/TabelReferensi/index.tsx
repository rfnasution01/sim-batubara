import { usePathname } from '@/libs/hooks/usePathname'
import { ComingSoonPage } from '@/routes/loadables'
// import Agama from './Agama'
// import Instansi from './AlasanHukumDisiplin'
// import ASNJenjangJabatan from './ASNJenjangJabatan'
// import Eselon from './Eselon'
// import Golongan from './Golongan'
// import JabatanFungsional from './JabatanFungsional'
// import JabatanFungsionalUmum from './JabatanFungsionalUmum'
// import JenisDiklat from './JenisDiklat'
// import JenisHukuman from './JenisHukuman'
// import JenisJabatan from './JenisJabatan'
// import Kanreg from './Kanreg'
// import KedudukanHukum from './KedudukanHukum'
// import LatihanStruktural from './LatihanStruktural'
// import Lokasi from './Lokasi'
// import Pendidikan from './Pendidikan'
// import JenjangJF from './JenjangJF'
// import SatuanKerja from './SatuanKerja'
// import TingkatPendidikan from './TingkatPendidikan'

export default function TabelReferensiPage() {
  const { secondPathname } = usePathname()
  console.log({ secondPathname })

  return (
    <div className="scrollbar h-full overflow-y-auto">
      <div className="flex rounded-2x bg-white p-32">
        <ComingSoonPage />
        {/* {secondPathname === 'agama' ? (
          <Agama />
        ) : secondPathname === 'alasan-hukum-disiplin' ? (
          <Instansi />
        ) : secondPathname === 'asn-jenjang-jabatan' ? (
          <ASNJenjangJabatan />
        ) : secondPathname === 'eselon' ? (
          <Eselon />
        ) : secondPathname === 'golongan' ? (
          <Golongan />
        ) : secondPathname === 'instansi' ? (
          <Instansi />
        ) : secondPathname === 'jabatan-fungsional' ? (
          <JabatanFungsional />
        ) : secondPathname === 'jabatan-fungsional-umum' ? (
          <JabatanFungsionalUmum />
        ) : secondPathname === 'jenis-diklat' ? (
          <JenisDiklat />
        ) : secondPathname === 'jenis-hukuman' ? (
          <JenisHukuman />
        ) : secondPathname === 'jenis-jabatan' ? (
          <JenisJabatan />
        ) : secondPathname === 'kanreg' ? (
          <Kanreg />
        ) : secondPathname === 'kedudukan-hukum' ? (
          <KedudukanHukum />
        ) : secondPathname === 'latihan-struktural' ? (
          <LatihanStruktural />
        ) : secondPathname === 'lokasi' ? (
          <Lokasi />
        ) : secondPathname === 'pendidikan' ? (
          <Pendidikan />
        ) : secondPathname === 'ref-jenjang-jf' ? (
          <JenjangJF />
        ) : secondPathname === 'satuan-kerja' ? (
          <SatuanKerja />
        ) : secondPathname === 'tingkat-pendidikan' ? (
          <TingkatPendidikan />
        ) : (
          <ComingSoonPage />
        )} */}
      </div>
    </div>
  )
}

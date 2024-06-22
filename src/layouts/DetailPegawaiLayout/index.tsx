import { DataDetailPegawai, ProfilPegawai } from '@/features/DetailPegawai'

export default function DetailPegawaiLayoutMain() {
  const data = {
    nip: '198712312021011001',
    nama: 'Ahmad Fauzi',
    jk: 'L',
    jabatan: 'Analis Keuangan',
    gol: 'IIIA',
    noTelp: '081234567890',
    satuanKerja: 'Dinas Keuangan',
    photo: '/img/cosmos.png',
    instansi: 'Pemerintah Kab. Batubara',
  }
  return (
    <div className="flex flex-col gap-32">
      {/* --- Profil --- */}
      <ProfilPegawai data={data} />
      {/* --- Data --- */}
      <DataDetailPegawai />
    </div>
  )
}

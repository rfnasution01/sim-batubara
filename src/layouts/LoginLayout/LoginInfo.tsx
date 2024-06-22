import Logo from '@/assets/ImgBatubara.png'

export function LoginInfo() {
  return (
    <div className="flex w-3/5 flex-col gap-32">
      <img
        src={Logo}
        alt="Batubara"
        loading="lazy"
        className="h-[11rem] w-[45rem] filter"
      />
      <p className="mb-16 text-[4rem] tracking-1.5">SIASN - SIMPEG</p>
      <p className="text-[6rem] font-bold">Halaman Login</p>
      <p className="text-[2.8rem] text-sim-grey" style={{ lineHeight: '130%' }}>
        Hai, selamat datang kembali di SIM Batu Bara, Silahkan login dengan akun
        anda
      </p>
    </div>
  )
}

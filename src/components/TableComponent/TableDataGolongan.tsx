import { RiwayatGolonganType } from '@/libs/type'
import { useGetPNSRiwayatGolonganQuery } from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'

export function TableDataGolongan({ idPegawai }: { idPegawai: string }) {
  const navigate = useNavigate()
  const [riwayatGolongan, setRiwayatGolongan] = useState<RiwayatGolonganType>()

  const {
    data: riwayatGolonganData,
    isLoading: riwayatGolonganIsLoading,
    isFetching: riwayatGolonganIsFetching,
    error,
  } = useGetPNSRiwayatGolonganQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatGolongan =
    riwayatGolonganIsLoading || riwayatGolonganIsFetching

  useEffect(() => {
    if (riwayatGolonganData) {
      setRiwayatGolongan(riwayatGolonganData?.data)
    }
    const errorMsg = error as {
      data?: {
        message?: string
      }
    }

    if (errorMsg?.data?.message === 'Token Tidak Sesuai') {
      Cookies.remove('token')
      navigate('/login')
    }
  }, [riwayatGolonganData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto rounded-3x`}
      style={{ scrollbarGutter: 'stable' }}
    >
      {isLoadingRiwayatGolongan ? (
        <Loading width={'6rem'} height={'6rem'} />
      ) : (
        <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
          <thead className="relative z-10 align-top leading-medium">
            <tr>
              <th
                className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
              >
                <div className="flex items-center justify-center">res</div>
              </th>
              <th
                className={`sticky top-0 w-[40%] border bg-sim-pale-primary px-24 py-24 text-left align-middle text-sim-dark`}
              >
                Data SIASN BKN
              </th>
              <th
                className={`sticky top-0 w-[40%] border bg-sim-pale-primary px-24 py-24 text-left align-middle text-sim-dark`}
              >
                Data SIMPEG Batu Bara
              </th>
            </tr>
          </thead>
          <tbody>
            {riwayatGolongan?.siasn?.map((item, idx) => (
              <tr
                className="transition-all ease-in hover:cursor-pointer"
                key={idx}
              >
                {/* Kolom pertama (Golongan) hanya pada baris pertama */}
                {idx === 0 && (
                  <th
                    className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark"
                    rowSpan={riwayatGolongan?.siasn?.length}
                  >
                    Golongan
                  </th>
                )}
                {/* Kolom kedua (siasn) */}
                <td className="border px-24 py-12 align-middle leading-medium">
                  {item?.golongan}
                </td>
                {/* Kolom ketiga (lokal) */}
                {idx < riwayatGolongan?.lokal?.length ? (
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {riwayatGolongan?.lokal?.[idx]?.golongan}
                  </td>
                ) : idx === 0 ? (
                  <td
                    className="border px-24 py-12 text-center align-middle leading-medium"
                    rowSpan={riwayatGolongan?.siasn?.length}
                  >
                    Belum ada data, lakukan sinkronisasi
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

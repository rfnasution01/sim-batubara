import { RiwayatAnak } from '@/libs/type'
import { RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import dayjs from 'dayjs'
import { Bounce, toast } from 'react-toastify'
import { useGetRiwayatAnakQuery } from '@/store/slices/kepegawaianAPI'

export function TableDataAnak({
  idPegawai,
  form,
  handleSubmitriwayatAnak,
  isSinkronriwayatAnak,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatAnak: () => Promise<void>
  isSinkronriwayatAnak: boolean
}) {
  const navigate = useNavigate()
  const [riwayatAnak, setRiwayatAnak] = useState<RiwayatAnak>()

  const {
    data: riwayatAnakData,
    isLoading: riwayatAnakIsLoading,
    isFetching: riwayatAnakIsFetching,
    error,
  } = useGetRiwayatAnakQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatAnak = riwayatAnakIsLoading || riwayatAnakIsFetching

  useEffect(() => {
    if (riwayatAnakData) {
      setRiwayatAnak(riwayatAnakData?.data)
    }
    const errorMsg = error as {
      data?: {
        message?: string
      }
    }

    if (
      errorMsg?.data?.message === 'Token Expired' ||
      errorMsg?.data?.message === 'Token Tidak Sesuai'
    ) {
      Cookies.remove('token')
      navigate('/login')
    }
    if (
      errorMsg?.data?.message?.includes('Client error') ||
      errorMsg?.data?.message?.includes('Server error')
    ) {
      toast.error(`Terjadi Kesalahan di server BKN`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [riwayatAnakData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isLoadingRiwayatAnak || isSinkronriwayatAnak ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <p className="text-sim-grey">
              Sinkronisasi Terakhir:{' '}
              {riwayatAnak?.last_update
                ? dayjs(riwayatAnak?.last_update)
                    .locale('id')
                    .format('DD/MM/YYYY | HH:mm')
                : 'Belum Sinkronisasi'}
            </p>
            <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
              <thead className="relative z-10 align-top leading-medium">
                <tr>
                  <th
                    className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
                  >
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleSubmitriwayatAnak)}
                      >
                        <button
                          type="submit"
                          disabled={riwayatAnak?.siasn?.length === 0}
                          className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white disabled:cursor-not-allowed"
                        >
                          Sinkron Data <RefreshCcw size={16} />
                        </button>
                      </form>
                    </Form>
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
                {riwayatAnak && riwayatAnak?.siasn?.length > 0 ? (
                  riwayatAnak?.siasn?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nama
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.nama ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatAnak?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.nama ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tempat Lahir
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tempatLahir ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatAnak?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tempatLahir ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Lahir
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {dayjs(item?.tglLahir)
                            ?.locale('id')
                            .format('DD/MM/YYYY') ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {dayjs(
                            riwayatAnak?.lokal?.find(
                              (list) => list?.id === item?.id,
                            )?.tglLahir,
                          )
                            .locale('id')
                            .format('DD/MM/YYYY') ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Jenis Kelamin
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.jenisKelamin === 'F'
                            ? 'Perempuan'
                            : item?.jenisKelamin === 'M'
                              ? 'Laki-laki'
                              : '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatAnak?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.jenisKelamin === 'M'
                            ? 'Laki-laki'
                            : riwayatAnak?.lokal?.find(
                                  (list) => list?.id === item?.id,
                                )?.jenisKelamin === 'F'
                              ? 'Perempuan'
                              : '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Jenis Anak
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.jenisAnak ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatAnak?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.jenisAnak ?? '-'}
                        </td>
                      </tr>

                      {idx < riwayatAnak?.siasn?.length - 1 && (
                        <tr className="border transition-all ease-in hover:cursor-pointer">
                          <td
                            className="border px-24 py-12 align-middle leading-medium text-white"
                            colSpan={3}
                          >
                            #
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr className="border transition-all ease-in hover:cursor-pointer">
                    <td
                      className="border px-24 py-12 text-center align-middle leading-medium"
                      colSpan={3}
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

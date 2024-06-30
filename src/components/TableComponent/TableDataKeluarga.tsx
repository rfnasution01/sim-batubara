import { RiwayatKeluargaType } from '@/libs/type'
import { RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import dayjs from 'dayjs'
import { Bounce, toast } from 'react-toastify'
import { useGetKeluargaQuery } from '@/store/slices/kepegawaianAPI'

export function TableDataKeluarga({
  idPegawai,
  form,
  handleSubmitriwayatKeluarga,
  isSinkronriwayatKeluarga,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatKeluarga: () => Promise<void>
  isSinkronriwayatKeluarga: boolean
}) {
  const navigate = useNavigate()
  const [riwayatKeluarga, setRiwayatKeluarga] = useState<RiwayatKeluargaType>()

  const {
    data: riwayatKeluargaData,
    isLoading: riwayatKeluargaIsLoading,
    isFetching: riwayatKeluargaIsFetching,
    error,
  } = useGetKeluargaQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatKeluarga =
    riwayatKeluargaIsLoading || riwayatKeluargaIsFetching

  useEffect(() => {
    if (riwayatKeluargaData) {
      setRiwayatKeluarga(riwayatKeluargaData?.data)
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
  }, [riwayatKeluargaData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isLoadingRiwayatKeluarga || isSinkronriwayatKeluarga ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <p className="text-sim-grey">
              Sinkronisasi Terakhir:{' '}
              {riwayatKeluarga?.last_update
                ? dayjs(riwayatKeluarga?.last_update)
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
                        onSubmit={form.handleSubmit(
                          handleSubmitriwayatKeluarga,
                        )}
                      >
                        <button
                          type="submit"
                          className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white"
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
                {riwayatKeluarga && riwayatKeluarga?.siasn?.length > 0 ? (
                  riwayatKeluarga?.siasn?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nama
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.nama ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatKeluarga?.lokal?.find(
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
                          {riwayatKeluarga?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tempatLahir ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Lahir
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tglLahir ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatKeluarga?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tglLahir ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Status Pernikahan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.statusNikah ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatKeluarga?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.statusNikah ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Menikah
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tgglMenikah ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatKeluarga?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tgglMenikah ?? '-'}
                        </td>
                      </tr>

                      {idx < riwayatKeluarga?.siasn?.length - 1 && (
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

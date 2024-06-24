import { RiwayatPenghargaanType } from '@/libs/type'
import { RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import { useGetPNSRiwayatPengharaagnQuery } from '@/store/slices/kepegawaianAPI'

export function TableDataPenghargaan({
  idPegawai,
  form,
  handleSubmitriwayatPenghargaan,
  isSinkronriwayatPenghargaan,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatPenghargaan: () => Promise<void>
  isSinkronriwayatPenghargaan: boolean
}) {
  const navigate = useNavigate()
  const [riwayatPenghargaan, setRiwayatPenghargaan] =
    useState<RiwayatPenghargaanType>()

  const {
    data: riwayatPenghargaanData,
    isLoading: riwayatPenghargaanIsLoading,
    isFetching: riwayatPenghargaanIsFetching,
    error,
  } = useGetPNSRiwayatPengharaagnQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatPenghargaan =
    riwayatPenghargaanIsLoading || riwayatPenghargaanIsFetching

  useEffect(() => {
    if (riwayatPenghargaanData) {
      setRiwayatPenghargaan(riwayatPenghargaanData?.data)
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
  }, [riwayatPenghargaanData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto rounded-3x`}
      style={{ scrollbarGutter: 'stable' }}
    >
      {isLoadingRiwayatPenghargaan || isSinkronriwayatPenghargaan ? (
        <Loading width={'6rem'} height={'6rem'} />
      ) : (
        <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
          <thead className="relative z-10 align-top leading-medium">
            <tr>
              <th
                className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmitriwayatPenghargaan)}
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
            {riwayatPenghargaan && riwayatPenghargaan?.siasn?.length > 0 ? (
              riwayatPenghargaan?.siasn?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Jenis Penghargaan
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.hargaNama ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPenghargaan?.lokal?.[idx]?.hargaNama ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Tahun Perolehan
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.tahun ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPenghargaan?.lokal?.[idx]?.tahun ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Nomor SK
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.skNomor ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPenghargaan?.lokal?.[idx]?.skNomor ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Tanggal SK
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.skDate ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPenghargaan?.lokal?.[idx]?.skDate ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      File
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      -
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      -
                    </td>
                  </tr>

                  {idx < riwayatPenghargaan.siasn.length - 1 && (
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
      )}
    </div>
  )
}

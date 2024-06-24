import { RiwayatDiklatLainnyaType } from '@/libs/type'
import { useGetPNSRiwayatDiklatLainnyaQuery } from '@/store/slices/kepegawaianAPI'
import { RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'

export function TableDataDiklatLainnya({
  idPegawai,
  form,
  handleSubmitriwayatDiklatLainnya,
  isSinkronriwayatDiklatLainnya,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatDiklatLainnya: () => Promise<void>
  isSinkronriwayatDiklatLainnya: boolean
}) {
  const navigate = useNavigate()
  const [riwayatDiklatLainnya, setRiwayatDiklatLainnya] =
    useState<RiwayatDiklatLainnyaType>()

  const {
    data: riwayatDiklatLainnyaData,
    isLoading: riwayatDiklatLainnyaIsLoading,
    isFetching: riwayatDiklatLainnyaIsFetching,
    error,
  } = useGetPNSRiwayatDiklatLainnyaQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatDiklatLainnya =
    riwayatDiklatLainnyaIsLoading || riwayatDiklatLainnyaIsFetching

  useEffect(() => {
    if (riwayatDiklatLainnyaData) {
      setRiwayatDiklatLainnya(riwayatDiklatLainnyaData?.data)
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
  }, [riwayatDiklatLainnyaData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto rounded-3x`}
      style={{ scrollbarGutter: 'stable' }}
    >
      {isLoadingRiwayatDiklatLainnya || isSinkronriwayatDiklatLainnya ? (
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
                    onSubmit={form.handleSubmit(
                      handleSubmitriwayatDiklatLainnya,
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
            {riwayatDiklatLainnya && riwayatDiklatLainnya?.siasn?.length > 0 ? (
              riwayatDiklatLainnya?.siasn?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Jenis Diklat
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.jenisKursusSertifikat ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatDiklatLainnya?.lokal?.[idx]
                        ?.jenisKursusSertifikat ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Nama Diklat
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.namaKursus ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatDiklatLainnya?.lokal?.[idx]?.namaKursus ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Tanggal Mulai
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.tanggalKursus ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatDiklatLainnya?.lokal?.[idx]?.tanggalKursus ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Tanggal Selesai
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.tanggalSelesaiKursus ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatDiklatLainnya?.lokal?.[idx]
                        ?.tanggalSelesaiKursus ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Penyelenggara
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.institusiPenyelenggara ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatDiklatLainnya?.lokal?.[idx]
                        ?.institusiPenyelenggara ?? '-'}
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
                  {idx < riwayatDiklatLainnya.siasn.length - 1 && (
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

import { RiwayatJabatanType } from '@/libs/type'
import { useGetPNSRiwayatJabatanQuery } from '@/store/slices/kepegawaianAPI'
import { RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'

export function TableDataJabatan({
  idPegawai,
  form,
  handleSubmitriwayatJabatan,
  isSinkronriwayatJabatan,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatJabatan: () => Promise<void>
  isSinkronriwayatJabatan: boolean
}) {
  const navigate = useNavigate()
  const [riwayatJabatan, setRiwayatJabatan] = useState<RiwayatJabatanType>()

  const {
    data: riwayatJabatanData,
    isLoading: riwayatJabatanIsLoading,
    isFetching: riwayatJabatanIsFetching,
    error,
  } = useGetPNSRiwayatJabatanQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatJabatan =
    riwayatJabatanIsLoading || riwayatJabatanIsFetching

  useEffect(() => {
    if (riwayatJabatanData) {
      setRiwayatJabatan(riwayatJabatanData?.data)
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
  }, [riwayatJabatanData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto rounded-3x`}
      style={{ scrollbarGutter: 'stable' }}
    >
      {isLoadingRiwayatJabatan || isSinkronriwayatJabatan ? (
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
                    onSubmit={form.handleSubmit(handleSubmitriwayatJabatan)}
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
            {riwayatJabatan && riwayatJabatan?.siasn?.length > 0 ? (
              riwayatJabatan?.siasn?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Jenis Jabatan
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.jenisJabatan ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatJabatan?.lokal?.[idx]?.jenisJabatan ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Satuan Kerja
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.namaUnor ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatJabatan?.lokal?.[idx]?.namaUnor ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Nama Jabatan
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.namaJabatan ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatJabatan?.lokal?.[idx]?.namaJabatan ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      TMT Jabatan
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.tmtJabatan ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatJabatan?.lokal?.[idx]?.tmtJabatan ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Nomor SK
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.nomorSk ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatJabatan?.lokal?.[idx]?.nomorSk ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Tanggal SK
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.tanggalSk ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatJabatan?.lokal?.[idx]?.tanggalSk ?? '-'}
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
                  {idx < riwayatJabatan.siasn.length - 1 && (
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

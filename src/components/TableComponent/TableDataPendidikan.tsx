import { RiwayatPendidikanType } from '@/libs/type'
import { useGetPNSRiwayatPendidikanQuery } from '@/store/slices/kepegawaianAPI'
import { RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'

export function TableDataPendidikan({
  idPegawai,
  form,
  handleSubmitriwayatPendidikan,
  isSinkronriwayatPendidikan,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatPendidikan: () => Promise<void>
  isSinkronriwayatPendidikan: boolean
}) {
  const navigate = useNavigate()
  const [riwayatPendidikan, setRiwayatPendidikan] =
    useState<RiwayatPendidikanType>()

  const {
    data: riwayatPendidikanData,
    isLoading: riwayatPendidikanIsLoading,
    isFetching: riwayatPendidikanIsFetching,
    error,
  } = useGetPNSRiwayatPendidikanQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatPendidikan =
    riwayatPendidikanIsLoading || riwayatPendidikanIsFetching

  useEffect(() => {
    if (riwayatPendidikanData) {
      setRiwayatPendidikan(riwayatPendidikanData?.data)
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
  }, [riwayatPendidikanData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto rounded-3x`}
      style={{ scrollbarGutter: 'stable' }}
    >
      {isLoadingRiwayatPendidikan || isSinkronriwayatPendidikan ? (
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
                    onSubmit={form.handleSubmit(handleSubmitriwayatPendidikan)}
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
            {riwayatPendidikan && riwayatPendidikan?.siasn?.length > 0 ? (
              riwayatPendidikan?.siasn?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Jenjang Pendidikan
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.pendidikanNama ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPendidikan?.lokal?.find(
                        (list) => list?.id === item?.id,
                      )?.pendidikanNama ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Tanggal Ijazah
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.tglLulus ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPendidikan?.lokal?.find(
                        (list) => list?.id === item?.id,
                      )?.tglLulus ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Nomor Ijazah
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.nomorIjasah ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPendidikan?.lokal?.find(
                        (list) => list?.id === item?.id,
                      )?.nomorIjasah ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Nama Instansi
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.namaSekolah ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPendidikan?.lokal?.find(
                        (list) => list?.id === item?.id,
                      )?.namaSekolah ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Gelar Depan
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.gelarDepan ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPendidikan?.lokal?.find(
                        (list) => list?.id === item?.id,
                      )?.gelarDepan ?? '-'}
                    </td>
                  </tr>
                  <tr className="transition-all ease-in hover:cursor-pointer">
                    <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                      Gelar Belakang
                    </th>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {item?.gelarBelakang ?? '-'}
                    </td>
                    <td className="border px-24 py-12 align-middle leading-medium">
                      {riwayatPendidikan?.lokal?.find(
                        (list) => list?.id === item?.id,
                      )?.gelarBelakang ?? '-'}
                    </td>
                  </tr>
                  {idx < riwayatPendidikan.siasn.length - 1 && (
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

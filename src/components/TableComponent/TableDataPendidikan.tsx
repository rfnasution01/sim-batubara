import { PathFileType, RiwayatPendidikanType } from '@/libs/type'
import { useGetPNSRiwayatPendidikanQuery } from '@/store/slices/kepegawaianAPI'
import { RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import dayjs from 'dayjs'
import PDFViewer from '../PDFShow'
import { Bounce, toast } from 'react-toastify'

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

    if (errorMsg?.data?.message?.includes('Data Tidak Ditemukan')) {
      toast.error(
        `${errorMsg?.data?.message ?? 'Terjadi Kesalahan di server BKN'}`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      )
    }

    if (
      errorMsg?.data?.message?.includes('Client error') ||
      errorMsg?.data?.message?.includes('Server error')
    ) {
      toast.error(
        `${errorMsg?.data?.message ?? 'Terjadi Kesalahan di server BKN'}`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      )
    }
  }, [riwayatPendidikanData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isLoadingRiwayatPendidikan || isSinkronriwayatPendidikan ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <p className="text-sim-grey">
              Sinkronisasi Terakhir:{' '}
              {riwayatPendidikan?.last_update
                ? dayjs(riwayatPendidikan?.last_update)
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
                          handleSubmitriwayatPendidikan,
                        )}
                      >
                        <button
                          type="submit"
                          disabled={riwayatPendidikan?.siasn?.length === 0}
                          className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white disabled:hover:cursor-not-allowed"
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
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          File
                        </th>
                        <td
                          colSpan={2}
                          className="border px-24 py-12 align-middle leading-medium"
                        >
                          {riwayatPendidikan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatPendidikan?.lokal?.find(
                                  (list) => list?.id === item?.id,
                                )?.path,
                              )?.map((pathItem: PathFileType, idx) => (
                                // <Link
                                //   to={`${downloadURL}jabatan/${riwayatJabatan?.siasn?.id}/${pathriwayatJabatan?.siasn?.dok_id}`}
                                //   key={idx}
                                //   target="_blank"
                                //   className="rounded-2xl bg-sim-dark px-16 py-8 text-white hover:bg-opacity-80"
                                // >
                                //   {pathriwayatJabatan?.siasn?.dok_nama}
                                // </Link>
                                <div key={idx}>
                                  <PDFViewer
                                    dok_id={pathItem?.dok_id}
                                    dok_nama={pathItem?.dok_nama}
                                    id={item?.id}
                                    riwayat="pendidikan"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            '-'
                          )}
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
          </>
        )}
      </div>
    </div>
  )
}

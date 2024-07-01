import { RefreshCcw } from 'lucide-react'
import { Loading } from '../Loading'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '../Form'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { useGetPNSRiwayatPendidikanQuery } from '@/store/slices/kepegawaianAPI'
import React, { useEffect, useState } from 'react'
import {
  PathFileType,
  PendidikanType,
  RiwayatPendidikanType,
} from '@/libs/type'
import { useNavigate } from 'react-router-dom'
import PDFViewer from '../PDFShow'
import { Bounce, toast } from 'react-toastify'

export function TableDataUtamaPendidikan({
  handleSubmitDataUtama,
  form,
  isSinkronDataUtama,
  idPegawai,
}: {
  handleSubmitDataUtama: () => Promise<void>
  form: UseFormReturn
  isSinkronDataUtama: boolean
  idPegawai: string
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
  }, [riwayatPendidikanData, idPegawai, error])

  const getJabatanTerbaru = (riwayatPendidikan) => {
    if (!riwayatPendidikan || !riwayatPendidikan.siasn) return null

    return riwayatPendidikan.siasn.reduce((latest, current) => {
      const latestDate = dayjs(latest?.tahunLulus, 'DD-MM-YYYY')
      const currentDate = dayjs(current?.tahunLulus, 'DD-MM-YYYY')

      return currentDate.isAfter(latestDate) ? current : latest
    })
  }

  const pendidikanTerbaru: PendidikanType = getJabatanTerbaru(riwayatPendidikan)

  return (
    <div className="flex flex-col gap-32">
      <p className="text-[3rem] font-bold">Data Pendidikan</p>
      <div
        className={`scrollbar flex flex-col overflow-auto`}
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="flex flex-col gap-12 rounded-3x">
          {isSinkronDataUtama || isLoadingRiwayatPendidikan ? (
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
                          onSubmit={form.handleSubmit(handleSubmitDataUtama)}
                        >
                          <button
                            type="submit"
                            disabled={riwayatPendidikan?.siasn?.length === 0}
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
                  {riwayatPendidikan && riwayatPendidikan?.siasn?.length > 0 ? (
                    <React.Fragment>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Jenjang Pendidikan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {pendidikanTerbaru?.pendidikanNama ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPendidikan?.lokal?.find(
                            (list) => list?.id === pendidikanTerbaru?.id,
                          )?.pendidikanNama ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Ijazah
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {pendidikanTerbaru?.tglLulus ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPendidikan?.lokal?.find(
                            (list) => list?.id === pendidikanTerbaru?.id,
                          )?.tglLulus ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nomor Ijazah
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {pendidikanTerbaru?.nomorIjasah ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPendidikan?.lokal?.find(
                            (list) => list?.id === pendidikanTerbaru?.id,
                          )?.nomorIjasah ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nama Instansi
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {pendidikanTerbaru?.namaSekolah ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPendidikan?.lokal?.find(
                            (list) => list?.id === pendidikanTerbaru?.id,
                          )?.namaSekolah ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Gelar Depan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {pendidikanTerbaru?.gelarDepan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPendidikan?.lokal?.find(
                            (list) => list?.id === pendidikanTerbaru?.id,
                          )?.gelarDepan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Gelar Belakang
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {pendidikanTerbaru?.gelarBelakang ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPendidikan?.lokal?.find(
                            (list) => list?.id === pendidikanTerbaru?.id,
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
                            (list) => list?.id === pendidikanTerbaru?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatPendidikan?.lokal?.find(
                                  (list) => list?.id === pendidikanTerbaru?.id,
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
                                    id={pendidikanTerbaru?.id}
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
                    </React.Fragment>
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
    </div>
  )
}

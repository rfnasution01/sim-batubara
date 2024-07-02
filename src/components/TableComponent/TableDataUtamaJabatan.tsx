import { RefreshCcw } from 'lucide-react'
import { Loading } from '../Loading'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '../Form'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useGetPNSRiwayatJabatanQuery } from '@/store/slices/kepegawaianAPI'
import { JabatanType, PathFileType, RiwayatJabatanType } from '@/libs/type'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import PDFViewer from '../PDFShow'
import { Bounce, toast } from 'react-toastify'

export function TableDataUtamaJabatan({
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
  }, [riwayatJabatanData, idPegawai, error])

  const getJabatanTerbaru = (riwayatJabatan) => {
    if (!riwayatJabatan || !riwayatJabatan.siasn) return null

    return riwayatJabatan.siasn.reduce((latest, current) => {
      const latestDate = dayjs(latest.tmtJabatan, 'DD-MM-YYYY')
      const currentDate = dayjs(current.tmtJabatan, 'DD-MM-YYYY')

      return currentDate.isAfter(latestDate) ? current : latest
    })
  }

  const jabatanTerbaru: JabatanType = getJabatanTerbaru(riwayatJabatan)

  return (
    <div className="flex flex-col gap-32">
      <p className="text-[3rem] font-bold">Data Jabatan</p>
      <div
        className={`scrollbar flex flex-col overflow-auto`}
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="flex flex-col gap-12 rounded-3x">
          {isSinkronDataUtama || isLoadingRiwayatJabatan ? (
            <Loading width={'6rem'} height={'6rem'} />
          ) : (
            <>
              <p className="text-sim-grey">
                Sinkronisasi Terakhir:{' '}
                {riwayatJabatan?.last_update
                  ? dayjs(riwayatJabatan?.last_update)
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
                            disabled={riwayatJabatan?.siasn?.length === 0}
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
                  {riwayatJabatan && riwayatJabatan?.siasn?.length > 0 ? (
                    <React.Fragment>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Jenis Jabatan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          <p>{jabatanTerbaru?.jenisJabatan ?? '-'}</p>
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === jabatanTerbaru?.id,
                          )?.jenisJabatan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Satuan Kerja
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {jabatanTerbaru?.namaUnor ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === jabatanTerbaru?.id,
                          )?.namaUnor ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nama Jabatan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {jabatanTerbaru?.namaJabatan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === jabatanTerbaru?.id,
                          )?.namaJabatan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          TMT Jabatan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {jabatanTerbaru?.tmtJabatan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === jabatanTerbaru?.id,
                          )?.tmtJabatan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          TMT Pelantikan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {jabatanTerbaru?.tmtPelantikan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === jabatanTerbaru?.id,
                          )?.tmtPelantikan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nomor SK
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {jabatanTerbaru?.nomorSk ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === jabatanTerbaru?.id,
                          )?.nomorSk ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal SK
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {jabatanTerbaru?.tanggalSk ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === jabatanTerbaru?.id,
                          )?.tanggalSk ?? '-'}
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
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === jabatanTerbaru?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatJabatan?.lokal?.find(
                                  (list) => list?.id === jabatanTerbaru?.id,
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
                                    id={jabatanTerbaru?.id}
                                    riwayat="jabatan"
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

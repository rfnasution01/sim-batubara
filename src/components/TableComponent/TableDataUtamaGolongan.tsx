import { RefreshCcw } from 'lucide-react'
import { Loading } from '../Loading'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '../Form'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useGetPNSRiwayatGolonganQuery } from '@/store/slices/kepegawaianAPI'
import { PathFileType, RiwayatGolonganType } from '@/libs/type'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import PDFViewer from '../PDFShow'
import { Bounce, toast } from 'react-toastify'

export function TableDataUtamaGolongan({
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
  }, [riwayatGolonganData, idPegawai, error])

  return (
    <div className="flex flex-col gap-32">
      <p className="text-[3rem] font-bold">Data Golongan</p>
      <div
        className={`scrollbar flex flex-col overflow-auto`}
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="flex flex-col gap-12">
          {isSinkronDataUtama || isLoadingRiwayatGolongan ? (
            <Loading width={'6rem'} height={'6rem'} />
          ) : (
            <>
              <p className="text-sim-grey">
                Sinkronisasi Terakhir:{' '}
                {riwayatGolongan?.last_update
                  ? dayjs(riwayatGolongan?.last_update)
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
                            disabled={riwayatGolongan?.siasn?.length === 0}
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
                  {riwayatGolongan && riwayatGolongan?.siasn?.length > 0 ? (
                    <React.Fragment>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Golongan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.siasn?.[0]?.golongan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.lokal?.find(
                            (list) =>
                              list?.id === riwayatGolongan?.siasn?.[0]?.id,
                          )?.golongan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Pangkat
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.siasn?.[0]?.pangkat ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.lokal?.find(
                            (list) =>
                              list?.id === riwayatGolongan?.siasn?.[0]?.id,
                          )?.pangkat ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nomor SK
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.siasn?.[0]?.skNomor ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.lokal?.find(
                            (list) =>
                              list?.id === riwayatGolongan?.siasn?.[0]?.id,
                          )?.skNomor ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal SK
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.siasn?.[0]?.skTanggal ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.lokal?.find(
                            (list) =>
                              list?.id === riwayatGolongan?.siasn?.[0]?.id,
                          )?.skTanggal ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          TMT Golongan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {dayjs(riwayatGolongan?.siasn?.[0]?.tmtGolongan)
                            .locale('id')
                            .format('DD/MM/YYYY') ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {dayjs(
                            riwayatGolongan?.lokal?.find(
                              (list) =>
                                list?.id === riwayatGolongan?.siasn?.[0]?.id,
                            )?.tmtGolongan,
                          )
                            .locale('id')
                            .format('DD/MM/YYYY') ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          No Pertek BKN
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.siasn?.[0]?.noPertekBkn ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatGolongan?.lokal?.find(
                            (list) =>
                              list?.id === riwayatGolongan?.siasn?.[0]?.id,
                          )?.noPertekBkn ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Masa Kerja
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          <p>
                            {Number(
                              riwayatGolongan?.siasn?.[0]
                                ?.masaKerjaGolonganTahun,
                            ) > 0 && (
                              <span>
                                {
                                  riwayatGolongan?.siasn?.[0]
                                    ?.masaKerjaGolonganTahun
                                }{' '}
                                Tahun
                              </span>
                            )}{' '}
                            {Number(
                              riwayatGolongan?.siasn?.[0]
                                ?.masaKerjaGolonganBulan,
                            ) > 0 && (
                              <span>
                                {
                                  riwayatGolongan?.siasn?.[0]
                                    ?.masaKerjaGolonganBulan
                                }{' '}
                                Bulan
                              </span>
                            )}
                          </p>
                          {Number(
                            riwayatGolongan?.siasn?.[0]?.masaKerjaGolonganBulan,
                          ) === 0 &&
                            Number(
                              riwayatGolongan?.siasn?.[0]
                                ?.masaKerjaGolonganTahun,
                            ) === 0 && <p>-</p>}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          <p>
                            {Number(
                              riwayatGolongan?.lokal?.find(
                                (list) =>
                                  list?.id === riwayatGolongan?.siasn?.[0]?.id,
                              )?.masaKerjaGolonganTahun,
                            ) > 0 && (
                              <span>
                                {
                                  riwayatGolongan?.lokal?.find(
                                    (list) =>
                                      list?.id ===
                                      riwayatGolongan?.siasn?.[0]?.id,
                                  )?.masaKerjaGolonganTahun
                                }{' '}
                                Tahun
                              </span>
                            )}{' '}
                            {Number(
                              riwayatGolongan?.lokal?.find(
                                (list) =>
                                  list?.id === riwayatGolongan?.siasn?.[0]?.id,
                              )?.masaKerjaGolonganBulan,
                            ) > 0 && (
                              <span>
                                {
                                  riwayatGolongan?.lokal?.find(
                                    (list) =>
                                      list?.id ===
                                      riwayatGolongan?.siasn?.[0]?.id,
                                  )?.masaKerjaGolonganBulan
                                }
                              </span>
                            )}
                            {Number(
                              riwayatGolongan?.lokal?.find(
                                (list) =>
                                  list?.id === riwayatGolongan?.siasn?.[0]?.id,
                              )?.masaKerjaGolonganBulan,
                            ) === 0 &&
                              Number(
                                riwayatGolongan?.lokal?.find(
                                  (list) =>
                                    list?.id ===
                                    riwayatGolongan?.siasn?.[0]?.id,
                                )?.masaKerjaGolonganTahun,
                              ) === 0 && <p>-</p>}
                          </p>
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
                          {riwayatGolongan?.lokal?.find(
                            (list) =>
                              list?.id === riwayatGolongan?.siasn?.[0]?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatGolongan?.lokal?.find(
                                  (list) =>
                                    list?.id ===
                                    riwayatGolongan?.siasn?.[0]?.id,
                                )?.path,
                              )?.map((pathItem: PathFileType, idx) => (
                                <div key={idx}>
                                  <PDFViewer
                                    dok_id={pathItem?.dok_id}
                                    dok_nama={pathItem?.dok_nama}
                                    id={riwayatGolongan?.siasn?.[0]?.id}
                                    riwayat="golongan"
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

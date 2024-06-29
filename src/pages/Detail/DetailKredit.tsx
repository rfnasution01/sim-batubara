/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataKepegawaianUtamaHeaderType,
  PathFileType,
  RiwayatDetailAngkaKreditType,
} from '@/libs/type'
import {
  useCreateSinkronAngkaKreditMutation,
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSDetailRiwayatAngkaKreditQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import dayjs from 'dayjs'
import { ArrowLeft, RefreshCcw } from 'lucide-react'
import { usePathname } from '@/libs/hooks/usePathname'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Form } from '@/components/Form'
import { SinkronSchema } from '@/libs/schema'
import clsx from 'clsx'
import PDFViewer from '@/components/PDFShow'

export default function DetailAngkaKreditPage() {
  const navigate = useNavigate()
  const { firstPathname, secondPathname, thirdPathname } = usePathname()
  const idParams = localStorage.getItem('pegawaiID')
  const idAngkaKredit = localStorage.getItem('jabatanID')

  const form = useForm<zod.infer<typeof SinkronSchema>>({
    resolver: zodResolver(SinkronSchema),
    defaultValues: {},
  })

  // --- Data Utama ---
  const [kepegawaianUtamaHeader, setKepegawaianUtamaHeader] =
    useState<DataKepegawaianUtamaHeaderType>()

  const {
    data: kepegawaianUtamaData,
    isLoading: kepegawaianUtamaIsLoading,
    isFetching: kepegawaianUtamaIsFetching,
    error,
  } = useGetKepegawaianPNSUtamaQuery(
    {
      id_pegawai: idParams,
    },
    { skip: !idParams },
  )

  const isLoadingKepegawaianUtama =
    kepegawaianUtamaIsLoading || kepegawaianUtamaIsFetching

  useEffect(() => {
    if (kepegawaianUtamaData) {
      setKepegawaianUtamaHeader(kepegawaianUtamaData?.header)
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
  }, [kepegawaianUtamaData, idParams, error])

  // --- Detail ---
  const [kepegawaianAngkaKreditDetail, setKepegawaianAngkaKreditDetail] =
    useState<RiwayatDetailAngkaKreditType>()

  const {
    data: AngkaKreditDetailData,
    isLoading: AngkaKreditDetailIsLoading,
    isFetching: AngkaKreditDetailIsFetching,
  } = useGetPNSDetailRiwayatAngkaKreditQuery(
    {
      id: idAngkaKredit,
    },
    { skip: !idAngkaKredit },
  )

  const isLoadingAngkaKreditDetail =
    AngkaKreditDetailIsFetching || AngkaKreditDetailIsLoading

  useEffect(() => {
    if (AngkaKreditDetailData) {
      setKepegawaianAngkaKreditDetail(AngkaKreditDetailData?.data)
    }
  }, [AngkaKreditDetailData, idParams])

  // --- Sinkron Riwayat AngkaKredit ---
  const [
    createSinkronRiwayatAngkaKredit,
    {
      isError: isErrorSinkronRiwayatAngkaKredit,
      error: errorSinkronRiwayatAngkaKredit,
      isLoading: isLoadingSinkronRiwayatAngkaKredit,
      isSuccess: isSuccessSinkronRiwayatAngkaKredit,
    },
  ] = useCreateSinkronAngkaKreditMutation()

  const handleSubmitRiwayatAngkaKredit = async () => {
    try {
      await createSinkronRiwayatAngkaKredit({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatAngkaKredit) {
      toast.success('Data riwayat angka kredit berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatAngkaKredit])

  useEffect(() => {
    if (isErrorSinkronRiwayatAngkaKredit) {
      const errorMsg = errorSinkronRiwayatAngkaKredit as {
        data?: { message?: string }
      }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
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
  }, [isErrorSinkronRiwayatAngkaKredit, errorSinkronRiwayatAngkaKredit])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <ProfilPegawai data={kepegawaianUtamaHeader} />
      )}
      {isLoadingAngkaKreditDetail ? (
        <Loading width={'6rem'} height={'6rem'} />
      ) : (
        <div className="flex flex-col gap-24 rounded-3x bg-white p-32">
          <p className="text-[2.8rem] font-bold text-sim-dark">
            Detail Angka Kredit
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
                        handleSubmitRiwayatAngkaKredit,
                      )}
                    >
                      <button
                        type="submit"
                        disabled={isLoadingSinkronRiwayatAngkaKredit}
                        className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white"
                      >
                        Sinkron Data{' '}
                        <span
                          className={clsx('', {
                            'animate-spin duration-300':
                              isLoadingSinkronRiwayatAngkaKredit,
                          })}
                        >
                          <RefreshCcw size={16} />
                        </span>
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
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nomor SK
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  <p> {kepegawaianAngkaKreditDetail?.siasn?.nomorSk ?? '-'}</p>
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.lokal?.nomorSk ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal SK
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.siasn?.tanggalSk ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.lokal?.tanggalSk ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Waktu Penilaian
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.siasn?.bulanMulaiPenilaian ??
                    '-'}
                  /{kepegawaianAngkaKreditDetail?.siasn?.tahunMulaiPenilaian} -{' '}
                  {kepegawaianAngkaKreditDetail?.siasn?.bulanSelesaiPenilaian}/
                  {kepegawaianAngkaKreditDetail?.siasn?.tahunSelesaiPenilaian}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  <p>
                    {kepegawaianAngkaKreditDetail?.lokal?.bulanMulaiPenilaian ??
                      '-'}
                    /{kepegawaianAngkaKreditDetail?.lokal?.tahunMulaiPenilaian}{' '}
                    -{' '}
                    {kepegawaianAngkaKreditDetail?.lokal?.bulanSelesaiPenilaian}
                    /
                    {kepegawaianAngkaKreditDetail?.lokal?.tahunSelesaiPenilaian}
                  </p>
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Kredit Utama
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.siasn?.kreditUtamaBaru ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.lokal?.kreditUtamaBaru ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Kredit Penunjang
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.siasn?.kreditPenunjangBaru ??
                    '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.lokal?.kreditPenunjangBaru ??
                    '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nama Jabatan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.siasn?.namaJabatan ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.lokal?.namaJabatan ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Sumber
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.siasn?.Sumber ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianAngkaKreditDetail?.lokal?.Sumber ?? '-'}
                </td>
              </tr>

              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Sinkronisai Terakhir
                </th>
                <td
                  colSpan={2}
                  className="border px-24 py-12 align-middle leading-medium"
                >
                  {dayjs(kepegawaianAngkaKreditDetail?.last_update)
                    .locale('id')
                    .format('DD/MM/YYYY') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Sinkronisai User
                </th>
                <td
                  colSpan={2}
                  className="border px-24 py-12 align-middle leading-medium"
                >
                  {kepegawaianAngkaKreditDetail?.user_update ?? '-'}
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
                  {kepegawaianAngkaKreditDetail?.lokal?.path ? (
                    <div className="flex items-center gap-16">
                      {JSON.parse(
                        kepegawaianAngkaKreditDetail?.lokal?.path,
                      )?.map((item: PathFileType, idx) => (
                        // <Link
                        //   to={`${downloadURL}AngkaKredit/${kepegawaianAngkaKreditDetail?.lokal?.id}/${item?.dok_id}`}
                        //   key={idx}
                        //   target="_blank"
                        //   className="rounded-2xl bg-sim-dark px-16 py-8 text-white hover:bg-opacity-80"
                        // >
                        //   {item?.dok_nama}
                        // </Link>
                        <div key={idx}>
                          <PDFViewer
                            dok_id={item?.dok_id}
                            dok_nama={item?.dok_nama}
                            id={kepegawaianAngkaKreditDetail?.siasn?.id}
                            riwayat="angkakredit"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <Link
              to={`/${firstPathname}/${secondPathname}/${thirdPathname}`}
              className="flex items-center gap-12 rounded-2xl border bg-sim-primary px-16 py-8 text-[2rem] text-white hover:bg-opacity-80"
            >
              <ArrowLeft size={16} />
              Kembali ke halaman profil kepegawaian
            </Link>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataKepegawaianUtamaHeaderType,
  KursusDetailType,
  PathFileType,
} from '@/libs/type'
import {
  useCreateSinkronRiwayatDiklatLainnyaMutation,
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatKursusDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import { ModalShowFile } from '@/components/ModalComponent'
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

export default function DetailKursusPage() {
  const navigate = useNavigate()
  const { firstPathname, secondPathname, thirdPathname } = usePathname()
  const idParams = localStorage.getItem('pegawaiID')
  const idKursus = localStorage.getItem('jabatanID')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [nama, setNama] = useState<string>('')
  const [uri, setUri] = useState<string>('')

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
  const [kepegawaianKursusDetail, setKepegawaianKursusDetail] =
    useState<KursusDetailType>()

  const {
    data: KursusDetailData,
    isLoading: KursusDetailIsLoading,
    isFetching: KursusDetailIsFetching,
  } = useGetPNSRiwayatKursusDetailQuery(
    {
      id: idKursus,
    },
    { skip: !idKursus },
  )

  const isLoadingKursusDetail = KursusDetailIsFetching || KursusDetailIsLoading

  useEffect(() => {
    if (KursusDetailData) {
      setKepegawaianKursusDetail(KursusDetailData?.data)
    }
  }, [KursusDetailData, idParams])

  // --- Sinkron Riwayat Diklat Lainnya ---
  const [
    createSinkronRiwayatDiklatLainnya,
    {
      isError: isErrorSinkronRiwayatDiklatLainnya,
      error: errorSinkronRiwayatDiklatLainnya,
      isLoading: isLoadingSinkronRiwayatDiklatLainnya,
      isSuccess: isSuccessSinkronRiwayatDiklatLainnya,
    },
  ] = useCreateSinkronRiwayatDiklatLainnyaMutation()

  const handleSubmitRiwayatDiklatLainnya = async () => {
    try {
      await createSinkronRiwayatDiklatLainnya({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatDiklatLainnya) {
      toast.success('Data riwayat diklat lainnya berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatDiklatLainnya])

  useEffect(() => {
    if (isErrorSinkronRiwayatDiklatLainnya) {
      const errorMsg = errorSinkronRiwayatDiklatLainnya as {
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
  }, [isErrorSinkronRiwayatDiklatLainnya, errorSinkronRiwayatDiklatLainnya])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <ProfilPegawai data={kepegawaianUtamaHeader} />
      )}
      {isLoadingKursusDetail ? (
        <Loading width={'6rem'} height={'6rem'} />
      ) : (
        <div className="flex flex-col gap-24 rounded-3x bg-white p-32">
          <p className="text-[2.8rem] font-bold text-sim-dark">Detail Kursus</p>
          <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
            <thead className="relative z-10 align-top leading-medium">
              <tr>
                <th
                  className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
                >
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(
                        handleSubmitRiwayatDiklatLainnya,
                      )}
                    >
                      <button
                        type="submit"
                        disabled={isLoadingSinkronRiwayatDiklatLainnya}
                        className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white"
                      >
                        Sinkron Data{' '}
                        <span
                          className={clsx('', {
                            'animate-spin duration-300':
                              isLoadingSinkronRiwayatDiklatLainnya,
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
                  Jenis Diklat
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.siasn?.jenisKursus ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.lokal?.jenisKursus ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nama Diklat
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.siasn?.jenisKursus ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.lokal?.jenisKursus ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal Mulai
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.siasn?.tanggal ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.lokal?.tanggal ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal Selesai
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.siasn?.tanggalSelesai ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.lokal?.tanggalSelesai ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Jumlah Jam
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.siasn.jumlahJam} Jam
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.lokal.jumlahJam} Jam
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nomor Sertifikat
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.siasn.nomor}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.lokal.nomor}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Institusi Penyelenggara
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.siasn?.institusiPenyelenggara ??
                    '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianKursusDetail?.lokal?.institusiPenyelenggara ??
                    '-'}
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
                  {dayjs(kepegawaianKursusDetail?.last_update)
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
                  {kepegawaianKursusDetail?.user_update ?? '-'}
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
                  <div className="flex items-center gap-16">
                    {kepegawaianKursusDetail?.lokal?.path &&
                      JSON?.parse(kepegawaianKursusDetail?.lokal?.path)?.map(
                        (item: PathFileType, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setIsShow(true)
                              setUri(item?.dok_uri)
                              setNama(item?.dok_nama)
                            }}
                            className="rounded-2xl bg-sim-dark px-16 py-8 text-white hover:bg-opacity-80"
                          >
                            {item?.dok_nama}
                          </div>
                        ),
                      )}
                  </div>
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
      <ModalShowFile
        isOpen={isShow}
        setIsOpen={setIsShow}
        uri={uri}
        nama={nama}
      />
      <ToastContainer />
    </div>
  )
}

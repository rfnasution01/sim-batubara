/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataKepegawaianUtamaHeaderType,
  JabatanDetailType,
  PathFileType,
} from '@/libs/type'
import {
  useCreateSinkronRiwayatJabatanMutation,
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatJabatanDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import dayjs from 'dayjs'
import { ModalShowFile } from '@/components/ModalComponent'
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

export default function DetailJabatanPage() {
  const navigate = useNavigate()
  const { firstPathname, secondPathname, thirdPathname } = usePathname()
  const idParams = localStorage.getItem('pegawaiID')
  const idJabatan = localStorage.getItem('jabatanID')
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
  const [kepegawaianJabatanDetail, setKepegawaianJabatanDetail] =
    useState<JabatanDetailType>()

  const {
    data: jabatanDetailData,
    isLoading: jabatanDetailIsLoading,
    isFetching: jabatanDetailIsFetching,
  } = useGetPNSRiwayatJabatanDetailQuery(
    {
      id: idJabatan,
    },
    { skip: !idJabatan },
  )

  const isLoadingJabatanDetail =
    jabatanDetailIsFetching || jabatanDetailIsLoading

  useEffect(() => {
    if (jabatanDetailData) {
      setKepegawaianJabatanDetail(jabatanDetailData?.data)
    }
  }, [jabatanDetailData, idParams])

  // --- Sinkron Riwayat Jabatan ---
  const [
    createSinkronRiwayatJabatan,
    {
      isError: isErrorSinkronRiwayatJabatan,
      error: errorSinkronRiwayatJabatan,
      isLoading: isLoadingSinkronRiwayatJabatan,
      isSuccess: isSuccessSinkronRiwayatJabatan,
    },
  ] = useCreateSinkronRiwayatJabatanMutation()

  const handleSubmitRiwayatJabatan = async () => {
    try {
      await createSinkronRiwayatJabatan({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatJabatan) {
      toast.success('Data riwayat jabatan berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatJabatan])

  useEffect(() => {
    if (isErrorSinkronRiwayatJabatan) {
      const errorMsg = errorSinkronRiwayatJabatan as {
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
  }, [isErrorSinkronRiwayatJabatan, errorSinkronRiwayatJabatan])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <ProfilPegawai data={kepegawaianUtamaHeader} />
      )}
      {isLoadingJabatanDetail ? (
        <Loading width={'6rem'} height={'6rem'} />
      ) : (
        <div className="flex flex-col gap-24 rounded-3x bg-white p-32">
          <p className="text-[2.8rem] font-bold text-sim-dark">
            Detail Jabatan
          </p>
          <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
            <thead className="relative z-10 align-top leading-medium">
              <tr>
                <th
                  className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
                >
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSubmitRiwayatJabatan)}
                    >
                      <button
                        type="submit"
                        disabled={isLoadingSinkronRiwayatJabatan}
                        className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white"
                      >
                        Sinkron Data{' '}
                        <span
                          className={clsx('', {
                            'animate-spin duration-300':
                              isLoadingSinkronRiwayatJabatan,
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
                  Jenis Jabatan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.siasn?.jenisJabatan}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.lokal?.jenisJabatan}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Satuan Kerja
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.siasn?.satuanKerja}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.lokal?.satuanKerja}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nama Jabatan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.siasn?.namaJabatan ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.lokal?.namaJabatan ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  TMT Jabatan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.siasn?.tmtJabatan ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.lokal?.tmtJabatan ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  TMT Pelantikan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.siasn?.tmtPelantikan ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.lokal?.tmtPelantikan ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nomor SK
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.siasn?.nomorSk ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.lokal?.nomorSk ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal SK
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.siasn?.tanggalSk ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianJabatanDetail?.lokal?.tanggalSk ?? '-'}
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
                  {dayjs(kepegawaianJabatanDetail?.last_update)
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
                  {kepegawaianJabatanDetail?.user_update ?? '-'}
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
                    {kepegawaianJabatanDetail?.lokal?.path &&
                      JSON?.parse(kepegawaianJabatanDetail?.lokal?.path)?.map(
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

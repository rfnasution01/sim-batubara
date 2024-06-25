/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataKepegawaianUtamaHeaderType,
  DiklatDetailType,
  PathFileType,
} from '@/libs/type'
import {
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatDiklatDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import { ModalShowFile } from '@/components/ModalComponent'
import dayjs from 'dayjs'
import { ArrowLeft } from 'lucide-react'
import { usePathname } from '@/libs/hooks/usePathname'

export default function DetailDiklatPage() {
  const navigate = useNavigate()
  const { firstPathname, secondPathname, thirdPathname } = usePathname()
  const idParams = localStorage.getItem('pegawaiID')
  const idDiklat = localStorage.getItem('jabatanID')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [nama, setNama] = useState<string>('')
  const [uri, setUri] = useState<string>('')

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
  const [kepegawaianDiklatDetail, setKepegawaianDiklatDetail] =
    useState<DiklatDetailType>()

  const {
    data: DiklatDetailData,
    isLoading: DiklatDetailIsLoading,
    isFetching: DiklatDetailIsFetching,
  } = useGetPNSRiwayatDiklatDetailQuery(
    {
      id: idDiklat,
    },
    { skip: !idDiklat },
  )

  const isLoadingDiklatDetail = DiklatDetailIsFetching || DiklatDetailIsLoading

  useEffect(() => {
    if (DiklatDetailData) {
      setKepegawaianDiklatDetail(DiklatDetailData?.data)
    }
  }, [DiklatDetailData, idParams])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <ProfilPegawai data={kepegawaianUtamaHeader} />
      )}
      {isLoadingDiklatDetail ? (
        <Loading width={'6rem'} height={'6rem'} />
      ) : (
        <div className="flex flex-col gap-24 rounded-3x bg-white p-32">
          <p className="text-[2.8rem] font-bold text-sim-dark">Detail Diklat</p>
          <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
            <thead className="relative z-10 align-top leading-medium">
              <tr>
                <th
                  className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
                ></th>
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
                  {kepegawaianDiklatDetail?.siasn.latihanStrukturalNama}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.lokal.latihanStrukturalNama}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal Mulai
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.siasn?.tanggal}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.lokal?.tanggal}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal Selesai
                </th>

                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.siasn?.tanggalSelesai}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.lokal?.tanggalSelesai}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Jumlah Jam
                </th>

                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.siasn?.jumlahJam} Jam
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.lokal?.jumlahJam} Jam
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nomor SK
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.siasn?.nomor}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.lokal?.nomor}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Penyelenggara
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.siasn?.institusiPenyelenggara}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianDiklatDetail?.lokal?.institusiPenyelenggara}
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
                  {dayjs(kepegawaianDiklatDetail?.last_update)
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
                  {kepegawaianDiklatDetail?.user_update ?? '-'}
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
                  {kepegawaianDiklatDetail?.lokal?.path ? (
                    <div className="flex items-center gap-16">
                      {JSON.parse(kepegawaianDiklatDetail?.lokal?.path)?.map(
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
      <ModalShowFile
        isOpen={isShow}
        setIsOpen={setIsShow}
        uri={uri}
        nama={nama}
      />
    </div>
  )
}

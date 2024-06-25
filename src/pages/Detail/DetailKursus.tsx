/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataKepegawaianUtamaHeaderType,
  KursusDetailType,
  PathFileType,
} from '@/libs/type'
import {
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatKursusDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import { ModalShowFile } from '@/components/ModalComponent'
import dayjs from 'dayjs'

export default function DetailKursusPage() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')
  const idKursus = localStorage.getItem('jabatanID')
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

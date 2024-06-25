/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataKepegawaianUtamaHeaderType,
  JabatanDetailType,
  PathFileType,
} from '@/libs/type'
import {
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatJabatanDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import dayjs from 'dayjs'
import { ModalShowFile } from '@/components/ModalComponent'

export default function DetailJabatanPage() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')
  const idJabatan = localStorage.getItem('jabatanID')
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataKepegawaianUtamaHeaderType,
  PathFileType,
  PenghargaanDetailType,
} from '@/libs/type'
import {
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatPenghargaanDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import { ModalShowFile } from '@/components/ModalComponent'

export default function DetailPenghargaanPage() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')
  const idPenghargaan = localStorage.getItem('jabatanID')
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
  const [kepegawaianPenghargaanDetail, setKepegawaianPenghargaanDetail] =
    useState<PenghargaanDetailType>()

  const {
    data: PenghargaanDetailData,
    isLoading: PenghargaanDetailIsLoading,
    isFetching: PenghargaanDetailIsFetching,
  } = useGetPNSRiwayatPenghargaanDetailQuery(
    {
      id: idPenghargaan,
    },
    { skip: !idPenghargaan },
  )

  const isLoadingPenghargaanDetail =
    PenghargaanDetailIsFetching || PenghargaanDetailIsLoading

  useEffect(() => {
    if (PenghargaanDetailData) {
      setKepegawaianPenghargaanDetail(PenghargaanDetailData?.data)
    }
  }, [PenghargaanDetailData, idParams])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <ProfilPegawai data={kepegawaianUtamaHeader} />
      )}
      {isLoadingPenghargaanDetail ? (
        <Loading width={'6rem'} height={'6rem'} />
      ) : (
        <div className="flex flex-col gap-24 rounded-3x bg-white p-32">
          <p className="text-[2.8rem] font-bold text-sim-dark">
            Detail Penghargaan
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
              </tr>
            </thead>
            <tbody>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Jenis Penghargaan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianPenghargaanDetail?.id ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tahun Perolehan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianPenghargaanDetail?.tahun ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nama Penghargaan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianPenghargaanDetail?.nama ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Nomor SK
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianPenghargaanDetail?.nomor ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal SK
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {kepegawaianPenghargaanDetail?.tanggal ?? '-'}
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
                    {kepegawaianPenghargaanDetail?.path &&
                      JSON?.parse(kepegawaianPenghargaanDetail?.path)?.map(
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
import { PathFileType, RiwayatPMKType } from '@/libs/type'
import { Plus, RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import dayjs from 'dayjs'
import { useGetPNSRiwayatMasaKerjaQuery } from '@/store/slices/kepegawaianAPI'
import { Bounce, toast } from 'react-toastify'
import PDFViewer from '../PDFShow'

export function TableDataMasaKerja({
  idPegawai,
  form,
  handleSubmitriwayatMasaKerja,
  isSinkronriwayatMasaKerja,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatMasaKerja: () => Promise<void>
  isSinkronriwayatMasaKerja: boolean
}) {
  const navigate = useNavigate()
  const [riwayatMasaKerja, setRiwayatMasaKerja] = useState<RiwayatPMKType>()
  //   const [isShow, setIsShow] = useState<boolean>(false)
  //   const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  //   const [isUri, setUri] = useState<string>('')
  //   const [isNama, setNama] = useState<string>('')

  const {
    data: riwayatMasaKerjaData,
    isLoading: riwayatMasaKerjaIsLoading,
    isFetching: riwayatMasaKerjaIsFetching,
    error,
  } = useGetPNSRiwayatMasaKerjaQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatMasaKerja =
    riwayatMasaKerjaIsLoading || riwayatMasaKerjaIsFetching

  useEffect(() => {
    if (riwayatMasaKerjaData) {
      setRiwayatMasaKerja(riwayatMasaKerjaData?.data)
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
  }, [riwayatMasaKerjaData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col gap-32 overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isLoadingRiwayatMasaKerja || isSinkronriwayatMasaKerja ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <p className="text-sim-grey">
              Sinkronisasi Terakhir:{' '}
              {riwayatMasaKerja?.last_update
                ? dayjs(riwayatMasaKerja?.last_update)
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
                        onSubmit={form.handleSubmit(
                          handleSubmitriwayatMasaKerja,
                        )}
                      >
                        <button
                          type="submit"
                          disabled={riwayatMasaKerja?.siasn?.length === 0}
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
                {riwayatMasaKerja && riwayatMasaKerja?.siasn?.length > 0 ? (
                  riwayatMasaKerja?.siasn?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Awal
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          <p>{item?.tanggalAwal ?? '-'}</p>
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatMasaKerja?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tanggalAwal ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Akhir
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tanggalSelesai ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatMasaKerja?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tanggalSelesai ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nomor SK
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.nomorSk ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatMasaKerja?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.nomorSk ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Masa Kerja(Tahun)
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.masaKerjaTahun ?? '-'} Tahun
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatMasaKerja?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.masaKerjaTahun ?? '-'}{' '}
                          Tahun
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Masa Kerja(Bulan)
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.masaKerjaBulan ?? '-'} Bulan
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatMasaKerja?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.masaKerjaBulan ?? '-'}{' '}
                          Bulan
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
                          {riwayatMasaKerja?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatMasaKerja?.lokal?.find(
                                  (list) => list?.id === item?.id,
                                )?.path,
                              )?.map((pathItem: PathFileType, idx) => (
                                <div key={idx}>
                                  <PDFViewer
                                    dok_id={pathItem?.dok_id}
                                    dok_nama={pathItem?.dok_nama}
                                    id={item?.id}
                                    riwayat="masakerja"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>

                      {idx < riwayatMasaKerja.siasn.length - 1 && (
                        <tr className="border transition-all ease-in hover:cursor-pointer">
                          <td
                            className="border px-24 py-12 align-middle leading-medium text-white"
                            colSpan={3}
                          >
                            #
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
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
      {!(isLoadingRiwayatMasaKerja || isSinkronriwayatMasaKerja) && (
        <div className="fixed bottom-80 right-64 z-50 flex justify-end">
          <Link
            to={`/kepegawaian/pns/${idPegawai}/MasaKerja/tambah`}
            className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            Tambah <Plus size={16} />
          </Link>
        </div>
      )}
      {/* <ModalShowFile
        isOpen={isShow}
        setIsOpen={setIsShow}
        uri={isUri}
        nama={isNama}
      /> */}
    </div>
  )
}

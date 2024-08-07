import { PathFileType, RiwayatPenghargaanType } from '@/libs/type'
import { Plus, RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import { useGetPNSRiwayatPengharaagnQuery } from '@/store/slices/kepegawaianAPI'
import dayjs from 'dayjs'
import { ModalShowKonfirmasiDelete } from '../ModalComponent/ModalKonfirmasiDelete'
import { usePathname } from '@/libs/hooks/usePathname'
import Select from 'react-select'
import PDFViewer from '../PDFShow'
import { Bounce, toast } from 'react-toastify'

export function TableDataPenghargaan({
  idPegawai,
  form,
  handleSubmitriwayatPenghargaan,
  isSinkronriwayatPenghargaan,
  handleDeletePenghargaan,
  isLoadingDeletePenghargaan,
  formDelete,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatPenghargaan: () => Promise<void>
  isSinkronriwayatPenghargaan: boolean
  handleDeletePenghargaan: (id: string) => Promise<void>
  isLoadingDeletePenghargaan: boolean
  formDelete: UseFormReturn
}) {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()
  const [riwayatPenghargaan, setRiwayatPenghargaan] =
    useState<RiwayatPenghargaanType>()
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  const {
    data: riwayatPenghargaanData,
    isLoading: riwayatPenghargaanIsLoading,
    isFetching: riwayatPenghargaanIsFetching,
    error,
  } = useGetPNSRiwayatPengharaagnQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatPenghargaan =
    riwayatPenghargaanIsLoading || riwayatPenghargaanIsFetching

  useEffect(() => {
    if (riwayatPenghargaanData) {
      setRiwayatPenghargaan(riwayatPenghargaanData?.data)
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
  }, [riwayatPenghargaanData, idPegawai, error])

  const years = [
    { value: 'all', label: 'Tampilkan Semua Tahun' },
    ...Array.from(
      new Set(
        riwayatPenghargaan?.siasn
          ?.map((item) => {
            const dateStr = item?.skDate
            const year = dateStr?.slice(-4) // Mengambil 4 karakter terakhir
            console.log(`Date string: ${dateStr}, Year: ${year}`)
            return year
          })
          .filter((year) => year !== null),
      ),
    ).map((year) => ({ value: year, label: year })),
  ]

  const handleYearChange = (selectedOption: { value: string } | null) => {
    setSelectedYear(selectedOption?.value ?? null)
  }

  const filteredRiwayatPenghargaan =
    selectedYear && selectedYear !== 'all' && riwayatPenghargaanData
      ? {
          ...riwayatPenghargaan,
          siasn: riwayatPenghargaan.siasn.filter((item) => {
            const dateStr = item?.skDate
            const year = dateStr?.slice(-4) // Mengambil 4 karakter terakhir
            return year === selectedYear
          }),
        }
      : riwayatPenghargaan

  return (
    <div
      className={`scrollbar flex flex-col gap-32 overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isLoadingRiwayatPenghargaan || isSinkronriwayatPenghargaan ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sim-grey">
                Sinkronisasi Terakhir:{' '}
                {riwayatPenghargaan?.last_update
                  ? dayjs(riwayatPenghargaan?.last_update)
                      .locale('id')
                      .format('DD/MM/YYYY | HH:mm')
                  : 'Belum Sinkronisasi'}
              </p>
              <Select
                options={years}
                onChange={handleYearChange}
                isClearable
                placeholder="Filter berdasarkan tahun"
                className="z-50 w-1/4"
              />
            </div>
            <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
              <thead className="relative z-10 align-top leading-medium">
                <tr>
                  <th
                    className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
                  >
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(
                          handleSubmitriwayatPenghargaan,
                        )}
                      >
                        <button
                          type="submit"
                          disabled={riwayatPenghargaan?.siasn?.length === 0}
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
                {filteredRiwayatPenghargaan &&
                filteredRiwayatPenghargaan?.siasn?.length > 0 ? (
                  filteredRiwayatPenghargaan?.siasn?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Jenis Penghargaan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          <div className="flex flex-wrap items-center gap-16">
                            <p>{item?.hargaNama ?? '-'}</p>
                            <button
                              type="submit"
                              onClick={() => {
                                setId(item?.id)
                                setIsShowDelete(true)
                              }}
                              className="text-nowrap rounded-2xl border bg-danger px-16 py-8 text-[2rem] text-white hover:bg-opacity-80"
                            >
                              Hapus Data
                            </button>
                            <Link
                              to={`/kepegawaian/pns/${thirdPathname}/penghargaan/detail`}
                              onClick={() => {
                                localStorage.setItem('jabatanID', item?.id)
                              }}
                              className="rounded-2xl border bg-sim-primary px-16 py-8 text-[2rem] text-white hover:bg-opacity-80"
                            >
                              Detail
                            </Link>
                            <Link
                              to={`/kepegawaian/pns/${thirdPathname}/penghargaan/edit`}
                              onClick={() => {
                                localStorage.setItem('editID', item?.id)
                              }}
                              className="rounded-2xl border bg-success-800 px-16 py-8 text-[2rem] text-white hover:bg-opacity-80"
                            >
                              Edit
                            </Link>
                          </div>
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {filteredRiwayatPenghargaan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.hargaNama ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tahun Perolehan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tahun ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {filteredRiwayatPenghargaan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tahun ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nomor SK
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.skNomor ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {filteredRiwayatPenghargaan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.skNomor ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal SK
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.skDate ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {filteredRiwayatPenghargaan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.skDate ?? '-'}
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
                          {filteredRiwayatPenghargaan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatPenghargaan?.lokal?.find(
                                  (list) => list?.id === item?.id,
                                )?.path,
                              )?.map((pathItem: PathFileType, idx) => (
                                // <Link
                                //   to={`https://devapimobile.simbatubarakab.id/apisiasn/download/dokumenpenghargaan/${item?.id}/${pathItem?.dok_id}`}
                                //   key={idx}
                                //   target="_blank"
                                //   className="rounded-2xl bg-sim-dark px-16 py-8 text-white hover:bg-opacity-80"
                                // >
                                //   {pathItem?.dok_nama}
                                // </Link>
                                <div key={idx}>
                                  <PDFViewer
                                    dok_id={pathItem?.dok_id}
                                    dok_nama={pathItem?.dok_nama}
                                    id={item?.id}
                                    riwayat="penghargaan"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>

                      {idx < filteredRiwayatPenghargaan.siasn.length - 1 && (
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
      {!(isLoadingRiwayatPenghargaan || isSinkronriwayatPenghargaan) && (
        <div className="fixed bottom-80 right-64 z-50 flex justify-end">
          <Link
            to={`/kepegawaian/pns/${thirdPathname}/penghargaan/tambah`}
            className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            Tambah <Plus size={16} />
          </Link>
        </div>
      )}

      <ModalShowKonfirmasiDelete
        isLoading={isLoadingDeletePenghargaan}
        setIsOpen={setIsShowDelete}
        isOpen={isShowDelete}
        handleDeleteJabatan={handleDeletePenghargaan}
        form={formDelete}
        id={id}
      />
    </div>
  )
}

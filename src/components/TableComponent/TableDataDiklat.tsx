import { PathFileType, RiwayatDiklatType } from '@/libs/type'
import { useGetPNSRiwayatDiklatQuery } from '@/store/slices/kepegawaianAPI'
import { Plus, RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import dayjs from 'dayjs'
import { ModalShowKonfirmasiDelete } from '../ModalComponent/ModalKonfirmasiDelete'
import { usePathname } from '@/libs/hooks/usePathname'
import Select from 'react-select'
import PDFViewer from '../PDFShow'
import { Bounce, toast } from 'react-toastify'

export function TableDataDiklat({
  idPegawai,
  form,
  formDelete,
  handleSubmitriwayatDiklat,
  isSinkronriwayatDiklat,
  handleDeleteDiklat,
  isLoadingDeleteDiklat,
}: {
  idPegawai: string
  form: UseFormReturn
  formDelete: UseFormReturn
  handleSubmitriwayatDiklat: () => Promise<void>
  isSinkronriwayatDiklat: boolean
  handleDeleteDiklat: (id: string) => Promise<void>
  isLoadingDeleteDiklat: boolean
}) {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()
  const [riwayatDiklat, setRiwayatDiklat] = useState<RiwayatDiklatType>()
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  const {
    data: riwayatDiklatData,
    isLoading: riwayatDiklatIsLoading,
    isFetching: riwayatDiklatIsFetching,
    error,
  } = useGetPNSRiwayatDiklatQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatDiklat =
    riwayatDiklatIsLoading || riwayatDiklatIsFetching

  useEffect(() => {
    if (riwayatDiklatData) {
      setRiwayatDiklat(riwayatDiklatData?.data)
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
  }, [riwayatDiklatData, idPegawai, error])

  const years = [
    { value: 'all', label: 'Tampilkan Semua Tahun' },
    ...Array.from(
      new Set(
        riwayatDiklat?.siasn
          ?.map((item) => {
            const dateStr = item?.tanggal
            const year = dateStr?.slice(-4) // Mengambil 4 karakter terakhir
            console.log(`Date string: ${dateStr}, Year: ${year}`)
            return year
          })
          .filter((year) => year !== null),
      ),
    ).map((year) => ({ value: year, label: year })),
  ]

  // console.log(years)

  const handleYearChange = (selectedOption: { value: string } | null) => {
    setSelectedYear(selectedOption?.value ?? null)
  }

  const filteredRiwayatDiklat =
    selectedYear && selectedYear !== 'all' && riwayatDiklat
      ? {
          ...riwayatDiklat,
          siasn: riwayatDiklat.siasn.filter((item) => {
            const dateStr = item?.tanggal
            const year = dateStr?.slice(-4) // Mengambil 4 karakter terakhir
            return year === selectedYear
          }),
        }
      : riwayatDiklat

  return (
    <div
      className={`scrollbar flex flex-col gap-32 overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isLoadingRiwayatDiklat || isSinkronriwayatDiklat ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sim-grey">
                Sinkronisasi Terakhir:{' '}
                {riwayatDiklat?.last_update
                  ? dayjs(riwayatDiklat?.last_update)
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
                        onSubmit={form.handleSubmit(handleSubmitriwayatDiklat)}
                      >
                        <button
                          type="submit"
                          className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white"
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
                {filteredRiwayatDiklat &&
                filteredRiwayatDiklat?.siasn?.length > 0 ? (
                  filteredRiwayatDiklat?.siasn?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nama Diklat
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          <div className="flex flex-wrap items-center gap-16">
                            <p> {item?.latihanStrukturalNama ?? '-'}</p>
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
                              to={`/kepegawaian/pns/${thirdPathname}/diklat/detail`}
                              onClick={() => {
                                localStorage.setItem('jabatanID', item?.id)
                              }}
                              className="rounded-2xl border bg-sim-primary px-16 py-8 text-[2rem] text-white hover:bg-opacity-80"
                            >
                              Detail
                            </Link>
                            <Link
                              to={`/kepegawaian/pns/${thirdPathname}/diklat/edit`}
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
                          {filteredRiwayatDiklat?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.latihanStrukturalNama ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Mulai
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tanggal ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {filteredRiwayatDiklat?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tanggal ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Selesai
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tanggalSelesai ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {filteredRiwayatDiklat?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tanggalSelesai ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Penyelenggara
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.institusiPenyelenggara ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {filteredRiwayatDiklat?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.institusiPenyelenggara ?? '-'}
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
                          {filteredRiwayatDiklat?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatDiklat?.lokal?.find(
                                  (list) => list?.id === item?.id,
                                )?.path,
                              )?.map((pathItem: PathFileType, idx) => (
                                // <Link
                                //   to={`${downloadURL}diklat/${item?.id}/${pathItem?.dok_id}`}
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
                                    riwayat="diklat"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>

                      {idx < filteredRiwayatDiklat.siasn.length - 1 && (
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
      {!(isLoadingRiwayatDiklat || isSinkronriwayatDiklat) && (
        <div className="fixed bottom-80 right-64 z-50 flex justify-end">
          <Link
            to={`/kepegawaian/pns/${thirdPathname}/diklat/tambah`}
            className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            Tambah <Plus size={16} />
          </Link>
        </div>
      )}

      <ModalShowKonfirmasiDelete
        isLoading={isLoadingDeleteDiklat}
        setIsOpen={setIsShowDelete}
        isOpen={isShowDelete}
        handleDeleteJabatan={handleDeleteDiklat}
        form={formDelete}
        id={id}
      />
    </div>
  )
}

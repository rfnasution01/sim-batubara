import { PathFileType, RiwayatJabatanType } from '@/libs/type'
import { useGetPNSRiwayatJabatanQuery } from '@/store/slices/kepegawaianAPI'
import { Plus, RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import { ModalShowFile } from '../ModalComponent'
import dayjs from 'dayjs'
import { ModalShowKonfirmasiDelete } from '../ModalComponent/ModalKonfirmasiDelete'
import { usePathname } from '@/libs/hooks/usePathname'

export function TableDataJabatan({
  idPegawai,
  form,
  handleSubmitriwayatJabatan,
  isSinkronriwayatJabatan,
  formDelete,
  handleDeleteJabatan,
  isLoadingDeleteJabatan,
}: {
  idPegawai: string
  form: UseFormReturn
  formDelete: UseFormReturn
  handleSubmitriwayatJabatan: () => Promise<void>
  isSinkronriwayatJabatan: boolean
  handleDeleteJabatan: (id: string) => Promise<void>
  isLoadingDeleteJabatan: boolean
}) {
  const navigate = useNavigate()
  const { thirdPathname } = usePathname()
  const [riwayatJabatan, setRiwayatJabatan] = useState<RiwayatJabatanType>()
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isUri, setUri] = useState<string>('')
  const [isNama, setNama] = useState<string>('')
  const [id, setId] = useState<string>('')

  const {
    data: riwayatJabatanData,
    isLoading: riwayatJabatanIsLoading,
    isFetching: riwayatJabatanIsFetching,
    error,
  } = useGetPNSRiwayatJabatanQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatJabatan =
    riwayatJabatanIsLoading || riwayatJabatanIsFetching

  useEffect(() => {
    if (riwayatJabatanData) {
      setRiwayatJabatan(riwayatJabatanData?.data)
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
  }, [riwayatJabatanData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex h-[80vh] flex-col gap-32 overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-1 flex-col gap-12 rounded-3x">
        {isLoadingRiwayatJabatan || isSinkronriwayatJabatan ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <p className="text-sim-grey">
              Sinkronisasi Terakhir:{' '}
              {riwayatJabatan?.last_update
                ? dayjs(riwayatJabatan?.last_update)
                    .locale('id')
                    .format('DD/MM/YYYY | HH:mm')
                : 'Belum Sinkronisasi'}
            </p>
            <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
              <thead className="relative z-10 align-top leading-medium">
                <tr>
                  <th
                    className={`sticky top-0 w-[20%] border bg-white px-24 py-16 text-left align-middle text-sim-dark`}
                  >
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleSubmitriwayatJabatan)}
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
                {riwayatJabatan && riwayatJabatan?.siasn?.length > 0 ? (
                  riwayatJabatan?.siasn?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Jenis Jabatan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          <div className="flex flex-wrap items-center gap-16">
                            <p>{item?.jenisJabatan ?? '-'}</p>
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
                              to={`/kepegawaian/pns/${thirdPathname}/jabatan/detail`}
                              onClick={() => {
                                localStorage.setItem('jabatanID', item?.id)
                              }}
                              className="rounded-2xl border bg-sim-primary px-16 py-8 text-[2rem] text-white hover:bg-opacity-80"
                            >
                              Detail
                            </Link>
                          </div>
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.jenisJabatan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Satuan Kerja
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.namaUnor ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.namaUnor ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nama Jabatan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.namaJabatan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.namaJabatan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          TMT Jabatan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tmtJabatan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tmtJabatan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          TMT Pelantikan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tmtPelantikan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tmtPelantikan ?? '-'}
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
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.nomorSk ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal SK
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tanggalSk ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tanggalSk ?? '-'}
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
                          {riwayatJabatan?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatJabatan?.lokal?.find(
                                  (list) => list?.id === item?.id,
                                )?.path,
                              )?.map((item: PathFileType, idx) => (
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
                              ))}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      {idx < riwayatJabatan.siasn.length - 1 && (
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
      {!(isLoadingRiwayatJabatan || isSinkronriwayatJabatan) && (
        <div className="fixed bottom-80 right-64 z-50 flex justify-end">
          <Link
            to={`/kepegawaian/pns/${thirdPathname}/jabatan/tambah`}
            className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-16 text-white hover:bg-opacity-80"
          >
            Tambah <Plus size={16} />
          </Link>
        </div>
      )}
      <ModalShowFile
        isOpen={isShow}
        setIsOpen={setIsShow}
        uri={isUri}
        nama={isNama}
      />

      <ModalShowKonfirmasiDelete
        isLoading={isLoadingDeleteJabatan}
        setIsOpen={setIsShowDelete}
        isOpen={isShowDelete}
        handleDeleteJabatan={handleDeleteJabatan}
        form={formDelete}
        id={id}
      />
    </div>
  )
}

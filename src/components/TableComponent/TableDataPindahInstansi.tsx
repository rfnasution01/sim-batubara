import { PathFileType, RiwayatPindahInstansiType } from '@/libs/type'
import { Plus, RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import dayjs from 'dayjs'
import { useGetPNSRiwayatPindahInstansiQuery } from '@/store/slices/kepegawaianAPI'
import FileDownload from '../FileDownload'
import { Bounce, toast } from 'react-toastify'

export function TableDataPindahInstansi({
  idPegawai,
  form,
  handleSubmitriwayatPindahInstansi,
  isSinkronriwayatPindahInstansi,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatPindahInstansi: () => Promise<void>
  isSinkronriwayatPindahInstansi: boolean
}) {
  const navigate = useNavigate()
  const [riwayatPindahInstansi, setRiwayatPindahInstansi] =
    useState<RiwayatPindahInstansiType>()
  //   const [isShow, setIsShow] = useState<boolean>(false)
  //   const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  //   const [isUri, setUri] = useState<string>('')
  //   const [isNama, setNama] = useState<string>('')

  const {
    data: riwayatPindahInstansiData,
    isLoading: riwayatPindahInstansiIsLoading,
    isFetching: riwayatPindahInstansiIsFetching,
    error,
  } = useGetPNSRiwayatPindahInstansiQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatPindahInstansi =
    riwayatPindahInstansiIsLoading || riwayatPindahInstansiIsFetching

  useEffect(() => {
    if (riwayatPindahInstansiData) {
      setRiwayatPindahInstansi(riwayatPindahInstansiData?.data)
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
  }, [riwayatPindahInstansiData, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col gap-32 overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isLoadingRiwayatPindahInstansi || isSinkronriwayatPindahInstansi ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <p className="text-sim-grey">
              Sinkronisasi Terakhir:{' '}
              {riwayatPindahInstansi?.last_update
                ? dayjs(riwayatPindahInstansi?.last_update)
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
                          handleSubmitriwayatPindahInstansi,
                        )}
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
                {riwayatPindahInstansi &&
                riwayatPindahInstansi?.siasn?.length > 0 ? (
                  riwayatPindahInstansi?.siasn?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Instansi Kerja Lama
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          <p>{item?.instansiIndukLama ?? '-'}</p>
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPindahInstansi?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.instansiIndukLama ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Instansi Kerja Baru
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.instansiIndukBaru ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPindahInstansi?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.instansiIndukBaru ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Satuan Kerja Lama
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.satuanKerjaLama ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPindahInstansi?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.satuanKerjaLama ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Instansi Kerja Baru
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.satuanKerjaBaru ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPindahInstansi?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.satuanKerjaBaru ?? '-'}{' '}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          KPKN Baru
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.kpknBaru ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPindahInstansi?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.kpknBaru ?? '-'}{' '}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nomor SK BKN
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.skBknNomor ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPindahInstansi?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.skBknNomor ?? '-'}{' '}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal SK BKN
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.skBknTanggal ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatPindahInstansi?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.skBknTanggal ?? '-'}{' '}
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
                          {riwayatPindahInstansi?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatPindahInstansi?.lokal?.find(
                                  (list) => list?.id === item?.id,
                                )?.path,
                              )?.map((item: PathFileType, idx) => (
                                <div
                                  key={idx}
                                  // onClick={() => {
                                  //   setIsShow(true)
                                  //   setUri(item?.dok_uri)
                                  //   setNama(item?.dok_nama)
                                  // }}
                                  className="rounded-2xl bg-sim-dark px-16 py-8 text-white hover:bg-opacity-80"
                                >
                                  <FileDownload
                                    uri={item?.dok_uri}
                                    namaFile={item?.dok_nama}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>

                      {idx < riwayatPindahInstansi.siasn.length - 1 && (
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
      {!(isLoadingRiwayatPindahInstansi || isSinkronriwayatPindahInstansi) && (
        <div className="fixed bottom-80 right-64 z-50 flex justify-end">
          <Link
            to={`/kepegawaian/pns/${idPegawai}/PindahInstansi/tambah`}
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

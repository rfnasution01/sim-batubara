import { RiwayatAngkaKreditType } from '@/libs/type'
import { useGetRiwayatDP3Query } from '@/store/slices/kepegawaianAPI'
import { RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loading } from '../Loading'
import { Form } from '../Form'
import dayjs from 'dayjs'
import { Bounce, toast } from 'react-toastify'

export function TableDataDP3({
  idPegawai,
  form,
  handleSubmitriwayatDP3,
  isSinkronriwayatDP3,
}: {
  idPegawai: string
  form: UseFormReturn
  handleSubmitriwayatDP3: () => Promise<void>
  isSinkronriwayatDP3: boolean
}) {
  const navigate = useNavigate()
  const [riwayatDP3, setRiwayatDP3] = useState<RiwayatAngkaKreditType>()

  const {
    data: riwayatDP3Data,
    isLoading: riwayatDP3IsLoading,
    isFetching: riwayatDP3IsFetching,
    error,
  } = useGetRiwayatDP3Query(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const isLoadingRiwayatDP3 = riwayatDP3IsLoading || riwayatDP3IsFetching

  useEffect(() => {
    if (riwayatDP3Data) {
      setRiwayatDP3(riwayatDP3Data?.data)
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
  }, [riwayatDP3Data, idPegawai, error])

  return (
    <div
      className={`scrollbar flex flex-col overflow-auto`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isLoadingRiwayatDP3 || isSinkronriwayatDP3 ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <p className="text-sim-grey">
              Sinkronisasi Terakhir:{' '}
              {riwayatDP3?.last_update
                ? dayjs(riwayatDP3?.last_update)
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
                        onSubmit={form.handleSubmit(handleSubmitriwayatDP3)}
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
              {/* <tbody>
                {riwayatDP3 && riwayatDP3?.siasn?.length > 0 ? (
                  riwayatDP3?.siasn?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Jenjang DP3
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.DP3Nama ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatDP3?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.DP3Nama ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Tanggal Ijazah
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.tglLulus ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatDP3?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.tglLulus ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nomor Ijazah
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.nomorIjasah ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatDP3?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.nomorIjasah ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Nama Instansi
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.namaSekolah ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatDP3?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.namaSekolah ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Gelar Depan
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.gelarDepan ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatDP3?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.gelarDepan ?? '-'}
                        </td>
                      </tr>
                      <tr className="transition-all ease-in hover:cursor-pointer">
                        <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                          Gelar Belakang
                        </th>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {item?.gelarBelakang ?? '-'}
                        </td>
                        <td className="border px-24 py-12 align-middle leading-medium">
                          {riwayatDP3?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.gelarBelakang ?? '-'}
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
                          {riwayatDP3?.lokal?.find(
                            (list) => list?.id === item?.id,
                          )?.path ? (
                            <div className="flex items-center gap-16">
                              {JSON.parse(
                                riwayatDP3?.lokal?.find(
                                  (list) => list?.id === item?.id,
                                )?.path,
                              )?.map((pathItem: PathFileType, idx) => (
                                // <Link
                                //   to={`${downloadURL}jabatan/${riwayatJabatan?.siasn?.id}/${pathriwayatJabatan?.siasn?.dok_id}`}
                                //   key={idx}
                                //   target="_blank"
                                //   className="rounded-2xl bg-sim-dark px-16 py-8 text-white hover:bg-opacity-80"
                                // >
                                //   {pathriwayatJabatan?.siasn?.dok_nama}
                                // </Link>
                                <div key={idx}>
                                  <PDFViewer
                                    dok_id={pathItem?.dok_id}
                                    dok_nama={pathItem?.dok_nama}
                                    id={item?.id}
                                    riwayat="DP3"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      {idx < riwayatDP3.siasn.length - 1 && (
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
              </tbody> */}
            </table>
          </>
        )}
      </div>
    </div>
  )
}

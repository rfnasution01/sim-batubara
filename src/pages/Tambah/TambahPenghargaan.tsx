/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TambahPenghargaanSchema } from '@/libs/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import {
  DataKepegawaianUtamaHeaderType,
  PenghargaanDetailType,
} from '@/libs/type'
import { FormLabelInput, Input } from '@/components/InputComponent'
import { Check, Loader2, Save, Upload } from 'lucide-react'
import {
  useCreateSavaPenghargaanMutation,
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatPenghargaanDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { usePathname } from '@/libs/hooks/usePathname'
import { convertSlugToText } from '@/libs/helpers/format-text'
import clsx from 'clsx'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import { ModalShowKonfirmasiPenghargaan } from '@/components/ModalComponent/ModalKonfirmasiPenghargaan'
import { SelectListJenisPenghargaan } from '@/components/SelectComponent'
import dayjs from 'dayjs'

export default function TambahPenghargaanPage() {
  const navigate = useNavigate()
  const { thirdPathname, lastPathname } = usePathname()
  const isEdit = lastPathname === 'edit'
  const idParams = localStorage.getItem('pegawaiID')
  const id = localStorage.getItem('editID')

  const [file, setFile] = useState<File>()
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahPenghargaanSchema>>({
    resolver: zodResolver(TambahPenghargaanSchema),
    defaultValues: {},
  })

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

  const [
    createSavePenghargaan,
    {
      isError: isErrorSavePenghargaan,
      error: errorSavePenghargaan,
      isLoading: isLoadingSavePenghargaan,
      isSuccess: isSuccessSavePenghargaan,
    },
  ] = useCreateSavaPenghargaanMutation()

  const handleSubmitPenghargaan = async () => {
    const values = form.getValues()

    const formData = new FormData()

    formData.append('id', isEdit && id ? id : '')
    formData.append('id_pegawai', idParams)
    formData.append('hargaId', values?.hargaId ?? '')
    formData.append('skDate', values?.skDate ?? '')
    formData.append('skNomor', values?.skNomor ?? '')
    formData.append('tahun', values?.tahun ?? '')

    if (file) {
      formData.append('dokumen', file)
    }

    if (isSubmit && isShow) {
      try {
        console.log(...formData.entries())

        const res = await createSavePenghargaan({
          data: formData,
        })

        localStorage.setItem('jabatanID', res?.data?.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsSubmit(false)
      }
    }
  }

  useEffect(() => {
    if (isSuccessSavePenghargaan) {
      toast.success('Data berhasil di simpan', {
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
      setTimeout(() => {
        navigate(`/kepegawaian/pns/${thirdPathname}/penghargaan/detail`)
      }, 3000)
    }
  }, [isSuccessSavePenghargaan])

  useEffect(() => {
    if (isErrorSavePenghargaan) {
      const errorMsg = errorSavePenghargaan as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
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
  }, [isErrorSavePenghargaan, errorSavePenghargaan])

  // --- Detail ---
  const [kepegawaianPenghargaanDetail, setKepegawaianPenghargaanDetail] =
    useState<PenghargaanDetailType>()

  const {
    data: PenghargaanDetailData,
    isLoading: PenghargaanDetailIsLoading,
    isFetching: PenghargaanDetailIsFetching,
  } = useGetPNSRiwayatPenghargaanDetailQuery(
    {
      id: id,
    },
    { skip: !isEdit },
  )

  const isLoadingPenghargaanDetail =
    PenghargaanDetailIsFetching || PenghargaanDetailIsLoading

  useEffect(() => {
    if (PenghargaanDetailData) {
      setKepegawaianPenghargaanDetail(PenghargaanDetailData?.data)
    }
  }, [PenghargaanDetailData, idParams])

  useEffect(() => {
    if (isEdit && id && kepegawaianPenghargaanDetail) {
      form.setValue(
        'tahun',
        kepegawaianPenghargaanDetail?.siasn?.tahun?.toString(),
      )
      form.setValue('skNomor', kepegawaianPenghargaanDetail?.siasn?.nomor)
      form.setValue(
        'skDate',
        dayjs(kepegawaianPenghargaanDetail?.siasn?.tanggal)
          .locale('id')
          .format('YYYY-MM-DD'),
      )
    }
  }, [isEdit, id, kepegawaianPenghargaanDetail])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama || isLoadingPenghargaanDetail ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <>
          <ProfilPegawai data={kepegawaianUtamaHeader} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitPenghargaan)}
              className="flex flex-col gap-32 rounded-3x bg-white p-32"
            >
              <p className="text-[2.8rem] font-bold">
                Form {convertSlugToText(lastPathname)} Riwayat Penghargaan
              </p>
              <div className="flex flex-col gap-32 rounded-3x border bg-white p-32">
                <div className="flex items-center gap-32">
                  <SelectListJenisPenghargaan
                    useFormReturn={form}
                    name="hargaId"
                    headerLabel="Jenis Penghargaan"
                    placeholder="Pilih Jenis Penghargaan"
                    className="w-1/2 phones:w-full"
                    isDisabled={isLoadingSavePenghargaan}
                  />
                </div>

                <div className="flex items-center gap-32">
                  <FormLabelInput
                    name="tahun"
                    form={form}
                    label="Tahun Perolehan"
                    placeholder="Masukkan Tahun Perolehan"
                    className="text-sim-dark"
                    type="text"
                    isNumber
                    isDisabled={isLoadingSavePenghargaan}
                  />
                  <FormLabelInput
                    name="skNomor"
                    form={form}
                    label="Nomor SK"
                    placeholder="Masukkan Nomor SK"
                    className="text-sim-dark"
                    type="text"
                    isDisabled={isLoadingSavePenghargaan}
                  />
                </div>

                <div className="flex items-center gap-32">
                  <FormLabelInput
                    name="skDate"
                    form={form}
                    label="Tanggal SK"
                    placeholder="Masukkan Tanggal SK"
                    className="w-1/2 text-sim-dark phones:w-full"
                    type="date"
                    isDisabled={isLoadingSavePenghargaan}
                  />
                  <FormField
                    name="dokumen"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-1/2 phones:w-full">
                        <FormControl>
                          <div className="flex flex-col gap-8">
                            <p>
                              Dokumen SK Penghargaan (
                              <span className="text-[1.6rem] text-danger">
                                *PDF
                              </span>
                              )
                            </p>
                            <Input
                              className="absolute w-full overflow-hidden opacity-0"
                              {...field}
                              id="berkas"
                              type="file"
                              value={''}
                              accept=".pdf"
                              disabled={isLoadingSavePenghargaan}
                              placeholder="Lampiran"
                              onChange={(e) => {
                                if (e.target.files[0] != null) {
                                  setFile(e.target.files[0])
                                }
                              }}
                            />
                            <div
                              className={clsx(
                                'flex w-full gap-12 phones:flex-col',
                                {
                                  'items-center': !file?.name,
                                },
                              )}
                            >
                              <div className="">
                                <label
                                  className={clsx(
                                    'flex items-center gap-12 rounded-2xl border px-16 py-8 hover:cursor-pointer phones:w-full',
                                    {
                                      'bg-sim-dark text-white': file?.name,
                                      'border-sim-dark text-sim-dark ':
                                        !file?.name,
                                    },
                                  )}
                                  htmlFor="berkas"
                                >
                                  <span>
                                    <Upload size={12} />
                                  </span>
                                  Upload
                                </label>
                              </div>
                              {file?.name ? (
                                <p>{file?.name}</p>
                              ) : (
                                <p className="text-sim-pale-grey">
                                  Belum ada file
                                </p>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={async () => {
                    const isValid = await form.trigger()
                    if (isValid) {
                      setIsShow(true)
                    }
                  }}
                  className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
                >
                  <Save size={16} />
                  Simpan
                </button>
              </div>
              <ModalShowKonfirmasiPenghargaan
                isOpen={isShow}
                setIsOpen={setIsShow}
                children={
                  <button
                    type="submit"
                    onClick={() => {
                      setIsSubmit(true)
                      handleSubmitPenghargaan()
                    }}
                    disabled={isLoadingSavePenghargaan}
                    className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
                  >
                    {isLoadingSavePenghargaan ? (
                      <div className="animate-spin duration-300">
                        <Loader2 size={16} />
                      </div>
                    ) : isSubmit ? (
                      <Save size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                    {isSubmit ? 'Simpan' : 'Sudah Benar'}
                  </button>
                }
                form={form}
                file={file?.name}
              />
            </form>
          </Form>
        </>
      )}

      <ToastContainer />
    </div>
  )
}

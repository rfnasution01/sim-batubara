/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TambahKursusSchema } from '@/libs/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { FormLabelInput, Input } from '@/components/InputComponent'
import { Check, Loader2, Save, Upload } from 'lucide-react'
import {
  useCreateSavaKursusMutation,
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatKursusDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { SelectListJenisKursus } from '@/components/SelectComponent'
import { ModalShowKonfirmasiKursus } from '@/components/ModalComponent'
import { usePathname } from '@/libs/hooks/usePathname'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { DataKepegawaianUtamaHeaderType, KursusDetailType } from '@/libs/type'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import { ProfilPegawai } from '@/features/DetailPegawai'
import dayjs from 'dayjs'

export default function TambahKursusPage() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')
  const id = localStorage.getItem('editID')
  const { thirdPathname, lastPathname } = usePathname()
  const isEdit = lastPathname === 'edit'
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const [file, setFile] = useState<File>()
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahKursusSchema>>({
    resolver: zodResolver(TambahKursusSchema),
    defaultValues: {},
  })

  const [
    createSaveKursus,
    {
      isError: isErrorSaveKursus,
      error: errorSaveKursus,
      isLoading: isLoadingSaveKursus,
      isSuccess: isSuccessSaveKursus,
    },
  ] = useCreateSavaKursusMutation()

  const handleSubmitKursus = async () => {
    const values = form.getValues()

    const formData = new FormData()

    formData.append('id', isEdit && id ? id : '')
    formData.append('id_pegawai', idParams)
    formData.append('jenisKursus', values?.jenisKursus ?? '')
    formData.append(
      'institusiPenyelenggara',
      values?.institusiPenyelenggara ?? '',
    )
    formData.append('noSertipikat', values?.noSertipikat ?? '')
    formData.append('namaKursus', values?.namaKursus ?? '')
    formData.append('jam', values?.jam ?? '')
    formData.append('tanggalKursus', values?.tanggalKursus ?? '')
    formData.append('tanggalSelesaiKursus', values?.tanggalSelesaiKursus ?? '')

    if (file) {
      formData.append('dokumen', file)
    }

    if (isSubmit && isShow) {
      try {
        const res = await createSaveKursus({
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
    if (isSuccessSaveKursus) {
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
        navigate(`/kepegawaian/pns/${thirdPathname}/kursus/detail`)
      }, 3000)
    }
  }, [isSuccessSaveKursus])

  useEffect(() => {
    if (isErrorSaveKursus) {
      const errorMsg = errorSaveKursus as { data?: { message?: string } }

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
  }, [isErrorSaveKursus, errorSaveKursus])

  // --- Detail ---
  const [kepegawaianKursusDetail, setKepegawaianKursusDetail] =
    useState<KursusDetailType>()

  const {
    data: KursusDetailData,
    isLoading: KursusDetailIsLoading,
    isFetching: KursusDetailIsFetching,
  } = useGetPNSRiwayatKursusDetailQuery(
    {
      id: id,
    },
    { skip: !isEdit },
  )

  const isLoadingKursusDetail = KursusDetailIsFetching || KursusDetailIsLoading

  useEffect(() => {
    if (KursusDetailData) {
      setKepegawaianKursusDetail(KursusDetailData?.data)
    }
  }, [KursusDetailData, idParams])

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

  useEffect(() => {
    if (id && isEdit && kepegawaianKursusDetail) {
      const data = kepegawaianKursusDetail?.siasn
      form.setValue('namaKursus', data?.namaKursus)
      form.setValue(
        'tanggalKursus',
        dayjs(data?.tanggal).locale('id').format('YYYY-MM-DD'),
      )
      form.setValue(
        'tanggalSelesaiKursus',
        dayjs(data?.tanggalSelesai).locale('id').format('YYYY-MM-DD'),
      )
      form.setValue('jam', data?.jumlahJam?.toString())
      form.setValue('noSertipikat', data?.nomor)
      form.setValue('institusiPenyelenggara', data?.institusiPenyelenggara)
    }
  }, [id, isEdit, kepegawaianKursusDetail])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama || isLoadingKursusDetail ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <>
          <ProfilPegawai data={kepegawaianUtamaHeader} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitKursus)}
              className="flex flex-col gap-32 rounded-3x bg-white p-32"
            >
              <p className="text-[2.8rem] font-bold">
                Form {convertSlugToText(lastPathname)} Riwayat Diklat Lainnya
              </p>
              <div className="flex flex-col gap-32">
                <div className="flex items-center gap-32">
                  <SelectListJenisKursus
                    useFormReturn={form}
                    name="jenisKursus"
                    headerLabel="Jenis Diklat"
                    placeholder="Pilih Jenis Diklat"
                    className="w-1/2 phones:w-full"
                    isDisabled={isLoadingSaveKursus}
                  />
                  <FormLabelInput
                    name="namaKursus"
                    form={form}
                    label="Nama Diklat"
                    placeholder="Masukkan Nama Diklat"
                    className="w-1/2 text-sim-dark phones:w-full"
                    type="text"
                    isDisabled={isLoadingSaveKursus}
                  />
                </div>
                <hr className="w-full border" />

                <div className="flex items-center gap-32">
                  <FormLabelInput
                    name="tanggalKursus"
                    form={form}
                    label="Tanggal Mulai"
                    placeholder="Masukkan Tanggal Mulai"
                    className="w-1/2 text-sim-dark phones:w-full"
                    type="date"
                    isDisabled={isLoadingSaveKursus}
                  />

                  <FormLabelInput
                    name="tanggalSelesaiKursus"
                    form={form}
                    label="Tanggal Selesai"
                    placeholder="Masukkan Tanggal Selesai"
                    className="w-1/2 text-sim-dark phones:w-full"
                    type="date"
                    isDisabled={isLoadingSaveKursus}
                  />
                </div>

                <FormLabelInput
                  name="jam"
                  form={form}
                  label="Jumlah Jam"
                  placeholder="Masukkan Jumlah Jam"
                  className="w-1/2 text-sim-dark phones:w-full"
                  type="text"
                  isNumber
                  isDisabled={isLoadingSaveKursus}
                />

                <hr className="w-full border" />

                <div className="flex items-center gap-32">
                  <FormLabelInput
                    name="noSertipikat"
                    form={form}
                    label="Nomor Sertifikat"
                    placeholder="Masukkan Nomor Sertifikat"
                    className="w-1/2 text-sim-dark phones:w-full"
                    type="text"
                    isDisabled={isLoadingSaveKursus}
                  />
                  <FormLabelInput
                    name="institusiPenyelenggara"
                    form={form}
                    label="Institusi Penyelenggara"
                    placeholder="Masukkan Institusi Penyelenggara"
                    className="w-1/2 text-sim-dark phones:w-full"
                    type="text"
                    isDisabled={isLoadingSaveKursus}
                  />
                </div>

                <FormField
                  name="dokumen"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-1 w-full">
                      <FormControl>
                        <div className="flex flex-col gap-8">
                          <p>
                            Dokumen (
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
                            disabled={isLoadingSaveKursus}
                            placeholder="Lampiran"
                            onChange={(e) => {
                              if (e.target.files[0] != null) {
                                setFile(e.target.files[0])
                              }
                            }}
                          />
                          <div className="flex w-full gap-32 phones:flex-col">
                            <div className="">
                              <label
                                className={clsx(
                                  'flex items-center gap-24 rounded-2xl border px-16 py-8 hover:cursor-pointer phones:w-full',
                                  {
                                    'bg-sim-dark text-white': file?.name,
                                    'border-sim-dark text-sim-dark ':
                                      !file?.name,
                                  },
                                )}
                                htmlFor="berkas"
                              >
                                <span>
                                  <Upload size={16} />
                                </span>
                                Upload
                              </label>
                            </div>
                            {file?.name && <p>{file?.name}</p>}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <ModalShowKonfirmasiKursus
                isOpen={isShow}
                setIsOpen={setIsShow}
                children={
                  <button
                    type="submit"
                    onClick={() => {
                      setIsSubmit(true)
                      handleSubmitKursus()
                    }}
                    disabled={isLoadingSaveKursus}
                    className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
                  >
                    {isLoadingSaveKursus ? (
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

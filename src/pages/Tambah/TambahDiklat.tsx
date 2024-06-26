/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
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
  useCreateSavaDiklatMutation,
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSRiwayatDiklatDetailQuery,
} from '@/store/slices/kepegawaianAPI'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { SelectListJenisDiklat } from '@/components/SelectComponent'
import { ModalShowKonfirmasiDiklat } from '@/components/ModalComponent'
import { TambahDiklatSchema } from '@/libs/schema'
import { usePathname } from '@/libs/hooks/usePathname'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { DataKepegawaianUtamaHeaderType, DiklatDetailType } from '@/libs/type'
import { Loading } from '@/components/Loading'
import { ProfilPegawai } from '@/features/DetailPegawai'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

export default function TambahDiklatPage() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')
  const id = localStorage.getItem('editID') ?? ''
  const { thirdPathname, lastPathname } = usePathname()
  const isEdit = lastPathname === 'edit'
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const [file, setFile] = useState<File>()
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahDiklatSchema>>({
    resolver: zodResolver(TambahDiklatSchema),
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
    createSaveDiklat,
    {
      isError: isErrorSaveDiklat,
      error: errorSaveDiklat,
      isLoading: isLoadingSaveDiklat,
      isSuccess: isSuccessSaveDiklat,
    },
  ] = useCreateSavaDiklatMutation()

  const handleSubmitDiklat = async () => {
    const values = form.getValues()

    const formData = new FormData()

    formData.append('id', isEdit && id ? id : '')
    formData.append('id_pegawai', idParams)
    formData.append('latihanStrukturalId', values?.latihanStrukturalId ?? '')
    formData.append(
      'institusiPenyelenggara',
      values?.institusiPenyelenggara ?? '',
    )
    formData.append('nomor', values?.nomor ?? '')
    formData.append('jam', values?.jam ?? '')
    formData.append('tanggal', values?.tanggal ?? '')
    formData.append('tanggalSelesai', values?.tanggalSelesai ?? '')

    if (file) {
      formData.append('dokumen', file)
    }

    if (isSubmit && isShow) {
      try {
        const res = await createSaveDiklat({
          data: formData,
        })
        localStorage.setItem('jabatanID', res?.data?.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsShow(false)
      }
    }
  }

  useEffect(() => {
    if (isSuccessSaveDiklat) {
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
        navigate(`/kepegawaian/pns/${thirdPathname}/diklat/detail`)
      }, 3000)
    }
  }, [isSuccessSaveDiklat])

  useEffect(() => {
    if (isErrorSaveDiklat) {
      const errorMsg = errorSaveDiklat as { data?: { message?: string } }

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
  }, [isErrorSaveDiklat, errorSaveDiklat])

  // --- Detail ---
  const [kepegawaianDiklatDetail, setKepegawaianDiklatDetail] =
    useState<DiklatDetailType>()

  const {
    data: DiklatDetailData,
    isLoading: DiklatDetailIsLoading,
    isFetching: DiklatDetailIsFetching,
  } = useGetPNSRiwayatDiklatDetailQuery(
    {
      id: id,
    },
    { skip: !isEdit },
  )

  const isLoadingDiklatDetail = DiklatDetailIsFetching || DiklatDetailIsLoading

  useEffect(() => {
    if (DiklatDetailData) {
      setKepegawaianDiklatDetail(DiklatDetailData?.data)
    }
  }, [DiklatDetailData, idParams])

  useEffect(() => {
    if (id && isEdit && kepegawaianDiklatDetail) {
      const data = kepegawaianDiklatDetail?.siasn
      const dateMulai = data?.tanggal
      const newDateMulai = dateMulai.split('-')

      const tglMulai = `${newDateMulai[2]}-${newDateMulai[1]}-${newDateMulai[0]}`
      const dateSelesai = data?.tanggalSelesai
      const newDateSelesai = dateSelesai.split('-')

      const tanggalSelesai = `${newDateSelesai[2]}-${newDateSelesai[1]}-${newDateSelesai[0]}`

      form.setValue(
        'tanggal',
        dayjs(tglMulai).locale('id').format('YYYY-MM-DD'),
      )
      form.setValue(
        'tanggalSelesai',
        dayjs(tanggalSelesai).locale('id').format('YYYY-MM-DD'),
      )
      form.setValue('jam', data?.jumlahJam?.toString())
      form.setValue('nomor', data?.nomor)
      form.setValue('institusiPenyelenggara', data?.institusiPenyelenggara)
    }
  }, [kepegawaianDiklatDetail, id, isEdit])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingDiklatDetail || isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <>
          <ProfilPegawai data={kepegawaianUtamaHeader} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitDiklat)}
              className="flex flex-col gap-32 rounded-3x bg-white p-32"
            >
              <p className="text-[2.8rem] font-bold">
                Form {convertSlugToText(lastPathname)} Riwayat Diklat Struktural
              </p>
              <div className="flex flex-col gap-32">
                <div className="flex items-center gap-32">
                  <SelectListJenisDiklat
                    useFormReturn={form}
                    name="latihanStrukturalId"
                    headerLabel="Jenis Diklat"
                    placeholder="Pilih Jenis Diklat"
                    className="w-1/2 phones:w-full"
                    isDisabled={isLoadingSaveDiklat}
                  />
                </div>
                <hr className="w-full border" />

                <div className="flex items-center gap-32">
                  <FormLabelInput
                    name="tanggal"
                    form={form}
                    label="Tanggal Mulai"
                    placeholder="Masukkan Tanggal"
                    className="text-sim-dark"
                    type="date"
                    isDisabled={isLoadingSaveDiklat}
                  />
                  <FormLabelInput
                    name="tanggalSelesai"
                    form={form}
                    label="Tanggal Selesai"
                    placeholder="Masukkan Tanggal Selesai"
                    className="text-sim-dark"
                    type="date"
                    isDisabled={isLoadingSaveDiklat}
                  />
                </div>
                <FormLabelInput
                  name="jam"
                  form={form}
                  label="Jumlah Jam"
                  placeholder="Masukkan Jumlah Jam"
                  className="w-1/2 text-sim-dark phones:w-full"
                  type="text"
                  isDisabled={isLoadingSaveDiklat}
                  isNumber
                />

                <hr className="w-full border" />

                <div className="flex items-center gap-32">
                  <FormLabelInput
                    name="nomor"
                    form={form}
                    label="Nomor SK"
                    placeholder="Masukkan Nomor SK"
                    className="w-1/2 text-sim-dark phones:w-full"
                    type="text"
                    isDisabled={isLoadingSaveDiklat}
                  />
                  <FormLabelInput
                    name="institusiPenyelenggara"
                    form={form}
                    label="Institusi Penyelenggara"
                    placeholder="Masukkan Institusi Penyelenggara"
                    className="w-1/2 text-sim-dark phones:w-full"
                    type="text"
                    isDisabled={isLoadingSaveDiklat}
                  />
                </div>

                <hr className="w-full border" />

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
                            disabled={isLoadingSaveDiklat}
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
              <ModalShowKonfirmasiDiklat
                isOpen={isShow}
                setIsOpen={setIsShow}
                children={
                  <button
                    type="submit"
                    onClick={() => {
                      setIsSubmit(true)
                      handleSubmitDiklat()
                    }}
                    disabled={isLoadingSaveDiklat}
                    className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
                  >
                    {isLoadingSaveDiklat ? (
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

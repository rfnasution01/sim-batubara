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
import {
  FormLabelInput,
  FormLabelRadio,
  Input,
} from '@/components/InputComponent'
import { Check, Loader2, Save, Upload } from 'lucide-react'
import {
  useCreateSavaAngkaKreditMutation,
  useGetKepegawaianPNSUtamaQuery,
  useGetPNSDetailRiwayatAngkaKreditQuery,
} from '@/store/slices/kepegawaianAPI'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { TambahAngkaKreditSchema } from '@/libs/schema'
import { usePathname } from '@/libs/hooks/usePathname'
import { ModalShowKonfirmasiAngkaKredit } from '@/components/ModalComponent'
import { SelectListNamaJabatan } from '@/components/SelectComponent'
import { SelectListTime } from '@/components/SelectComponent/SelectListTime'
import { ListBulan } from '@/libs/dummy/ListBulan'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { ProfilPegawai } from '@/features/DetailPegawai'
import { Loading } from '@/components/Loading'
import {
  DataKepegawaianUtamaHeaderType,
  RiwayatDetailAngkaKreditType,
} from '@/libs/type'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'

export default function TambahAngkaKreditPage() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')
  const id = localStorage.getItem('editID')
  const { thirdPathname, lastPathname } = usePathname()
  const isEdit = lastPathname === 'edit'
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const [file, setFile] = useState<File>()
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahAngkaKreditSchema>>({
    resolver: zodResolver(TambahAngkaKreditSchema),
    defaultValues: {},
  })

  const [
    createSaveAngkaKredit,
    {
      isError: isErrorSaveAngkaKredit,
      error: errorSaveAngkaKredit,
      isLoading: isLoadingSaveAngkaKredit,
      isSuccess: isSuccessSaveAngkaKredit,
    },
  ] = useCreateSavaAngkaKreditMutation()

  const handleSubmitAngkaKredit = async () => {
    const values = form.getValues()

    const formData = new FormData()

    formData.append('id', isEdit && id ? id : '')
    formData.append('id_pegawai', idParams)
    formData.append('id_riwayat_jabatan', values?.id_riwayat_jabatan ?? '')
    formData.append('bulanMulaiPenilaian', values?.bulanMulaiPenilaian ?? '')
    formData.append('tahunMulaiPenilaian', values?.tahunMulaiPenilaian ?? '')
    formData.append(
      'bulanSelesaiPenilaian',
      values?.bulanSelesaiPenilaian ?? '',
    )
    formData.append(
      'tahunSelesaiPenilaian',
      values?.tahunSelesaiPenilaian ?? '',
    )
    formData.append('isAngkaKreditPertama', values?.isAngkaKreditPertama ?? '')
    formData.append('kreditUtamaBaru', values?.kreditUtamaBaru ?? '')
    formData.append('kreditPenunjangBaru', values?.kreditPenunjangBaru ?? '')
    formData.append('kreditBaruTotal', values?.kreditPenunjangBaru ?? '')
    formData.append('nomorSk', values?.nomorSK ?? '')
    formData.append('tanggalSk', values?.tanggalSK ?? '')

    if (file) {
      formData.append('dokumen', file)
    }

    console.log(...formData.entries())

    if (isSubmit && isShow) {
      try {
        const res = await createSaveAngkaKredit({
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
    if (isSuccessSaveAngkaKredit) {
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
        navigate(`/kepegawaian/pns/${thirdPathname}/angka-kredit/detail`)
      }, 3000)
    }
  }, [isSuccessSaveAngkaKredit])

  useEffect(() => {
    if (isErrorSaveAngkaKredit) {
      const errorMsg = errorSaveAngkaKredit as { data?: { message?: string } }

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
  }, [isErrorSaveAngkaKredit, errorSaveAngkaKredit])

  const ListTahun = []
  const tahunSekarang = new Date().getFullYear()

  for (let i = tahunSekarang; i >= tahunSekarang - 60; i--) {
    ListTahun.push({ value: i.toString(), label: String(i) })
  }

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
  const [kepegawaianAngkaKreditDetail, setKepegawaianAngkaKreditDetail] =
    useState<RiwayatDetailAngkaKreditType>()

  const {
    data: AngkaKreditDetailData,
    isLoading: AngkaKreditDetailIsLoading,
    isFetching: AngkaKreditDetailIsFetching,
  } = useGetPNSDetailRiwayatAngkaKreditQuery(
    {
      id: id,
    },
    { skip: !isEdit },
  )

  const isLoadingAngkaKreditDetail =
    AngkaKreditDetailIsFetching || AngkaKreditDetailIsLoading

  useEffect(() => {
    if (AngkaKreditDetailData) {
      setKepegawaianAngkaKreditDetail(AngkaKreditDetailData?.data)
    }
  }, [AngkaKreditDetailData, idParams])

  useEffect(() => {
    if (id && isEdit && kepegawaianAngkaKreditDetail) {
      const data = kepegawaianAngkaKreditDetail?.siasn

      form.setValue(
        'bulanMulaiPenilaian',
        data?.bulanMulaiPenilaian?.toString()?.padStart(2, '0'),
      )
      form.setValue(
        'bulanSelesaiPenilaian',
        data?.bulanSelesaiPenilaian?.toString()?.padStart(2, '0'),
      )
      form.setValue(
        'tahunMulaiPenilaian',
        data?.tahunMulaiPenilaian?.toString(),
      )
      form.setValue(
        'tahunSelesaiPenilaian',
        data?.tahunSelesaiPenilaian?.toString(),
      )
      form.setValue('kreditUtamaBaru', data?.kreditUtamaBaru?.toString())
      form.setValue(
        'kreditPenunjangBaru',
        data?.kreditPenunjangBaru?.toString(),
      )
      form.setValue('kreditBaruTotal', data?.kreditBaruTotal?.toString())
      form.setValue('nomorSK', data?.nomorSk?.toString())
      form.setValue(
        'tanggalSK',
        dayjs(data?.tanggalSk).locale('id').format('YYYY-MM-DD'),
      )
      form.setValue(
        'isAngkaKreditPertama',
        data?.isAngkaKreditPertama?.toString(),
      )
    }
  }, [id, isEdit, kepegawaianAngkaKreditDetail])

  console.log(form.watch())

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama || isLoadingAngkaKreditDetail ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <>
          <ProfilPegawai data={kepegawaianUtamaHeader} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitAngkaKredit)}
              className="flex flex-col gap-32 rounded-3x bg-white p-32"
            >
              <p className="text-[2.8rem] font-bold">
                Form {convertSlugToText(lastPathname)} Riwayat Angka Kredit
              </p>
              <div className="flex flex-col gap-32">
                <div className="flex items-center gap-32">
                  <SelectListNamaJabatan
                    useFormReturn={form}
                    name="id_riwayat_jabatan"
                    headerLabel="Nama Jabatanss"
                    placeholder="Pilih Nama Jabatan"
                    className="w-1/2 phones:w-full"
                    isDisabled={isLoadingSaveAngkaKredit}
                  />
                </div>
                <hr className="w-full border" />

                <div className="flex items-center gap-32">
                  <SelectListTime
                    name="bulanMulaiPenilaian"
                    placeholder="Pilih Bulan Mulai"
                    form={form}
                    data={ListBulan}
                    headerLabel="Bulan Mulai"
                    className="w-1/4"
                  />

                  <SelectListTime
                    name="tahunMulaiPenilaian"
                    placeholder="Pilih Tahun Mulai"
                    form={form}
                    data={ListTahun}
                    headerLabel="Tahun Mulai"
                    className="w-1/4"
                  />
                  <SelectListTime
                    name="bulanSelesaiPenilaian"
                    placeholder="Pilih Bulan Selesai"
                    form={form}
                    data={ListBulan}
                    headerLabel="Bulan Selesai"
                    className="w-1/4"
                  />

                  <SelectListTime
                    name="tahunSelesaiPenilaian"
                    placeholder="Pilih Tahun Selesai"
                    form={form}
                    data={ListTahun}
                    headerLabel="Tahun Selesai"
                    className="w-1/4"
                  />
                </div>

                <hr className="w-full border" />

                <div className="flex items-center gap-32">
                  <FormLabelInput
                    name="kreditUtamaBaru"
                    form={form}
                    label="Kredit Utama"
                    placeholder="Masukkan Kredit Utama"
                    className="text-sim-dark"
                    type="text"
                    isFloat
                    isDisabled={isLoadingSaveAngkaKredit}
                  />
                  <FormLabelInput
                    name="kreditPenunjangBaru"
                    form={form}
                    label="Kredit Penunjang"
                    placeholder="Masukkan Kredit Penunjang"
                    className="text-sim-dark"
                    type="text"
                    isFloat
                    isDisabled={isLoadingSaveAngkaKredit}
                  />
                  <FormLabelInput
                    name="kreditBaruTotal"
                    form={form}
                    label="Kredit Total"
                    placeholder="Masukkan Kredit Total"
                    className="text-sim-dark"
                    type="text"
                    isFloat
                    isDisabled={isLoadingSaveAngkaKredit}
                  />
                </div>

                <hr className="w-full border" />

                <div className="flex items-center gap-32">
                  <FormLabelInput
                    name="nomorSK"
                    form={form}
                    label="Nomor SK"
                    placeholder="Masukkan Nomor SK"
                    className="text-sim-dark"
                    type="text"
                    isDisabled={isLoadingSaveAngkaKredit}
                  />
                  <FormLabelInput
                    name="tanggalSK"
                    form={form}
                    label="Tanggal SK"
                    placeholder="Masukkan Tanggal SK"
                    className="text-sim-dark"
                    type="date"
                    isDisabled={isLoadingSaveAngkaKredit}
                  />
                  <FormLabelRadio
                    name="isAngkaKreditPertama"
                    form={form}
                    label="Apakah angka kredit pertama?"
                    className="text-sim-dark phones:w-full"
                    isDisabled={isLoadingSaveAngkaKredit}
                  />
                </div>

                <div className="flex items-center gap-32"></div>

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
                            disabled={isLoadingSaveAngkaKredit}
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
              <ModalShowKonfirmasiAngkaKredit
                isOpen={isShow}
                setIsOpen={setIsShow}
                children={
                  <button
                    type="submit"
                    onClick={() => {
                      setIsSubmit(true)
                      handleSubmitAngkaKredit()
                    }}
                    disabled={isLoadingSaveAngkaKredit}
                    className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
                  >
                    {isLoadingSaveAngkaKredit ? (
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

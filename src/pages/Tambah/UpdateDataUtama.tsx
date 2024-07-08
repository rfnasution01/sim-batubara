/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { EditDataUtamaSchema } from '@/libs/schema'
import { Form } from '@/components/Form'
import {
  DataKepegawaianUtamaHeaderType,
  DataKepegawaianUtamaSIASNType,
} from '@/libs/type'
import { Check, Loader2, Save } from 'lucide-react'
import { useGetKepegawaianPNSUtamaQuery } from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { usePathname } from '@/libs/hooks/usePathname'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import { useUpdateDataUtamaMutation } from '@/store/slices/kepegawaianUtamaAPI'
import { FormLabelInput } from '@/components/InputComponent'
import { SelectListAgama } from '@/components/SelectComponent'
import { ModalShowKonfirmasiDataUtama } from '@/components/ModalComponent'

export default function UpdateDataUtamaPage() {
  const navigate = useNavigate()
  const { thirdPathname, lastPathname } = usePathname()
  const idParams = localStorage.getItem('pegawaiID')

  const [isShow, setIsShow] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof EditDataUtamaSchema>>({
    resolver: zodResolver(EditDataUtamaSchema),
    defaultValues: {},
  })

  // --- Data Utama ---
  const [kepegawaianUtamaHeader, setKepegawaianUtamaHeader] =
    useState<DataKepegawaianUtamaHeaderType>()
  const [kepegawaianUtamaSIASN, setKepegawaianUtamaSIASN] =
    useState<DataKepegawaianUtamaSIASNType>()

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
      setKepegawaianUtamaSIASN(kepegawaianUtamaData?.siasn)
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
    createSaveDataUtama,
    {
      isError: isErrorSaveDataUtama,
      error: errorSaveDataUtama,
      isLoading: isLoadingSaveDataUtama,
      isSuccess: isSuccessSaveDataUtama,
    },
  ] = useUpdateDataUtamaMutation()

  const handleSubmitDataUtama = async () => {
    const values = form.getValues()

    const body = {
      id_pegawai: idParams,
      id: values?.id ?? null,
      agamaId: values?.agama_id ?? null,
      alamat: values?.alamat ?? null,
      email: values?.email ?? null,
      emailGov: values?.emailGov ?? null,
      karis_karsu: values?.karis_karsu ?? null,
      kelas_jabatan: values?.kelas_jabatan ?? null,
      bpjs: values?.bpjs ?? null,
      noHp: values?.noHp ?? null,
      noTelp: values?.noTelp ?? null,
      noNpwp: values?.noNpwp ?? null,
      tglNpwp: values?.tglNpwp ?? null,
      tanggal_taspen: values?.tanggal_taspen ?? '',
      noTaspen: values?.noTaspen ?? null,
    }

    if (isSubmit && isShow) {
      try {
        await createSaveDataUtama({
          body: body,
        })
      } catch (error) {
        console.error(error)
      } finally {
        setIsSubmit(false)
      }
    }
  }

  useEffect(() => {
    if (isSuccessSaveDataUtama) {
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
        setIsShow(false)
        setIsSubmit(false)
        navigate(`/kepegawaian/pns/${thirdPathname}`)
      }, 3000)
    }
  }, [isSuccessSaveDataUtama])

  useEffect(() => {
    if (isErrorSaveDataUtama) {
      const errorMsg = errorSaveDataUtama as { data?: { message?: string } }

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
  }, [isErrorSaveDataUtama, errorSaveDataUtama])

  useEffect(() => {
    if (kepegawaianUtamaSIASN) {
      const data = kepegawaianUtamaSIASN
      form.setValue('id', data?.id)
      form.setValue('agama_id', data?.agamaId)
      form.setValue('agama', data?.agama)
      form.setValue('alamat', data?.alamat)
      form.setValue('email', data?.email)
      form.setValue('emailGov', data?.emailGov)
      form.setValue('karis_karsu', data?.karis_karsu)
      form.setValue('kelas_jabatan', data?.kelas_jabatan)
      form.setValue('bpjs', data?.bpjs)
      form.setValue('noHp', data?.noHp)
      form.setValue('noTelp', data?.noTelp)
      form.setValue('noNpwp', data?.noNpwp)

      const npwp = data?.tglNpwp
      const splitNPWP = npwp.split('-')
      const newNPWP = `${splitNPWP[2]}-${splitNPWP[1]}-${splitNPWP[0]}`

      form.setValue(
        'tglNpwp',
        data?.tglNpwp === '' || !data?.tglNpwp ? '' : newNPWP,
      )

      const taspen = data?.tanggal_taspen
      const splittaspen = taspen.split('-')
      const newtaspen = `${splittaspen[2]}-${splittaspen[1]}-${splittaspen[0]}`

      form.setValue(
        'tanggal_taspen',
        data?.tanggal_taspen === '' || !data?.tanggal_taspen ? '' : newtaspen,
      )
      form.setValue('noTaspen', data?.noTaspen)
    }
  }, [kepegawaianUtamaSIASN])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <>
          <ProfilPegawai data={kepegawaianUtamaHeader} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitDataUtama)}
              className="flex flex-col gap-32 rounded-3x bg-white p-32"
            >
              <p className="text-[2.8rem] font-bold">
                Form {convertSlugToText(lastPathname)} Data Utama
              </p>

              <SelectListAgama
                name="agama_id"
                placeholder="Pilih Agama"
                headerLabel="Agama"
                isDisabled={isLoadingSaveDataUtama}
                useFormReturn={form}
                className="w-1/2 phones:w-full"
              />
              <div className="grid grid-cols-2 gap-32">
                <FormLabelInput
                  name="alamat"
                  form={form}
                  placeholder="Masukkan Alamat"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="Alamat"
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="email"
                  form={form}
                  placeholder="Masukkan Email"
                  className="col-span-1 phones:col-span-2"
                  type="email"
                  label="Email"
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="emailGov"
                  form={form}
                  placeholder="Masukkan Email Gov"
                  className="col-span-1 phones:col-span-2"
                  type="email"
                  label="Email Pemerintahan"
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="karis_karsu"
                  form={form}
                  placeholder="Masukkan Karis/Karsu"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="Karis Karsu"
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="kelas_jabatan"
                  form={form}
                  placeholder="Masukkan Kelas Jabatan"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="Kelas Jabatan"
                  isNumber
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="bpjs"
                  form={form}
                  placeholder="Masukkan BPJS"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="BPJS"
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="noHp"
                  form={form}
                  placeholder="Masukkan No HP"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="No Hp"
                  isNumber
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="noTelp"
                  form={form}
                  placeholder="Masukkan No Telp"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="No Telp"
                  isNumber
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="noNpwp"
                  form={form}
                  placeholder="Masukkan No NPWP"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="No NPWP"
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="tglNpwp"
                  form={form}
                  placeholder="Masukkan Tanggal NPWP"
                  className="col-span-1 phones:col-span-2"
                  type="date"
                  label="Tanggal NPWP"
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="tanggal_taspen"
                  form={form}
                  placeholder="Masukkan Tanggal Taspen"
                  className="col-span-1 phones:col-span-2"
                  type="date"
                  label="Tanggal taspen"
                  isDisabled={isLoadingSaveDataUtama}
                />
                <FormLabelInput
                  name="noTaspen"
                  form={form}
                  placeholder="Masukkan No Taspen"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="No Taspen"
                  isDisabled={isLoadingSaveDataUtama}
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
              <ModalShowKonfirmasiDataUtama
                isOpen={isShow}
                setIsOpen={setIsShow}
                children={
                  <button
                    type="submit"
                    onClick={() => {
                      setIsSubmit(true)
                      handleSubmitDataUtama()
                    }}
                    disabled={isLoadingSaveDataUtama}
                    className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
                  >
                    {isLoadingSaveDataUtama ? (
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
              />
            </form>
          </Form>
        </>
      )}

      <ToastContainer />
    </div>
  )
}

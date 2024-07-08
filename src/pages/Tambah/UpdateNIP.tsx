/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { EditDataNIPSchema } from '@/libs/schema'
import { Form } from '@/components/Form'
import {
  DataKepegawaianUtamaHeaderType,
  DataKepegawaianUtamaType,
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
import { useUpdateNIPMutation } from '@/store/slices/kepegawaianUtamaAPI'
import { FormLabelInput } from '@/components/InputComponent'
import { ModalShowKonfirmasiNIP } from '@/components/ModalComponent'

export default function UpdateNIPPage() {
  const navigate = useNavigate()
  const { thirdPathname, lastPathname } = usePathname()
  const idParams = localStorage.getItem('pegawaiID')

  const [isShow, setIsShow] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof EditDataNIPSchema>>({
    resolver: zodResolver(EditDataNIPSchema),
    defaultValues: {},
  })

  // --- Data Utama ---
  const [kepegawaianUtamaHeader, setKepegawaianUtamaHeader] =
    useState<DataKepegawaianUtamaHeaderType>()
  const [kepegawaianUtama, setKepegawaianUtama] =
    useState<DataKepegawaianUtamaType>()

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
      setKepegawaianUtama(kepegawaianUtamaData?.data)
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
    createSaveNIP,
    {
      isError: isErrorSaveNIP,
      error: errorSaveNIP,
      isLoading: isLoadingSaveNIP,
      isSuccess: isSuccessSaveNIP,
    },
  ] = useUpdateNIPMutation()

  const handleSubmitNIP = async () => {
    const values = form.getValues()

    const body = {
      id_pegawai: idParams,
      nip: values?.nip ?? null,
    }

    if (isSubmit && isShow) {
      try {
        await createSaveNIP({
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
    if (isSuccessSaveNIP) {
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
  }, [isSuccessSaveNIP])

  useEffect(() => {
    if (isErrorSaveNIP) {
      const errorMsg = errorSaveNIP as { data?: { message?: string } }

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
  }, [isErrorSaveNIP, errorSaveNIP])

  useEffect(() => {
    if (kepegawaianUtama) {
      const data = kepegawaianUtama
      form.setValue('nip', data?.siasn?.nip)
    }
  }, [kepegawaianUtama])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <>
          <ProfilPegawai data={kepegawaianUtamaHeader} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitNIP)}
              className="flex flex-col gap-32 rounded-3x bg-white p-32"
            >
              <p className="text-[2.8rem] font-bold">
                Form Update {convertSlugToText(lastPathname)}
              </p>

              <div className="grid grid-cols-2 gap-32">
                <FormLabelInput
                  name="nip"
                  form={form}
                  placeholder="Masukkan NIP"
                  className="col-span-1 phones:col-span-2"
                  type="text"
                  label="NIP Baru"
                  isDisabled={isLoadingSaveNIP}
                  isNumber
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
              <ModalShowKonfirmasiNIP
                isOpen={isShow}
                setIsOpen={setIsShow}
                children={
                  <button
                    type="submit"
                    onClick={() => {
                      setIsSubmit(true)
                      handleSubmitNIP()
                    }}
                    disabled={isLoadingSaveNIP}
                    className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
                  >
                    {isLoadingSaveNIP ? (
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

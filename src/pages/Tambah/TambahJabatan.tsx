import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TambahSchema } from '@/libs/schema'
import { Form } from '@/components/Form'
import { JabatanType } from '@/libs/type'
import { FormLabelInput } from '@/components/InputComponent'
import { Save } from 'lucide-react'
import {
  SelectListJenisJabatan,
  SelectListSatuanKerjaJabatan,
} from '@/components/SelectComponent'
import { useCreateSavaJabatanMutation } from '@/store/slices/kepegawaianAPI'
import { useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { usePathname } from '@/libs/hooks/usePathname'
import { convertSlugToText } from '@/libs/helpers/format-text'

export default function TambahPage() {
  const navigate = useNavigate()
  const { fourthPathname } = usePathname()
  const idParams = localStorage.getItem('pegawaiID')

  const form = useForm<zod.infer<typeof TambahSchema>>({
    resolver: zodResolver(TambahSchema),
    defaultValues: {},
  })

  const [
    createSaveJabatan,
    {
      isError: isErrorSaveJabatan,
      error: errorSaveJabatan,
      isLoading: isLoadingSaveJabatan,
      isSuccess: isSuccessSaveJabatan,
    },
  ] = useCreateSavaJabatanMutation()

  const handleSubmitJabatan = async (values: JabatanType) => {
    const formData = new FormData()

    formData.append('id_pegawai', idParams)
    formData.append('id_jenis_jabatan', values?.jenisJabatan ?? '')
    formData.append('id_jabatan', values?.namaUnor ?? '')
    formData.append('tmt_pelantikan', values?.tmtPelantikan ?? '')
    formData.append('tmt_jabatan', values?.tmtJabatan ?? '')
    formData.append('nomor_sk_jabatan', values?.nomorSk ?? '')
    formData.append('tanggal_sk_jabatan', values?.tanggalSk ?? '')
    formData.append('dokumen', values?.path ?? '')
    formData.append('dokumensk', values?.path ?? '')

    try {
      await createSaveJabatan({
        data: formData,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSaveJabatan) {
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
        navigate(`/kepegawaian/pns/${idParams}`)
      }, 3000)
    }
  }, [isSuccessSaveJabatan])

  useEffect(() => {
    if (isErrorSaveJabatan) {
      const errorMsg = errorSaveJabatan as { data?: { message?: string } }

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
  }, [isErrorSaveJabatan, errorSaveJabatan])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitJabatan)}
          className="flex flex-col gap-32 rounded-3x bg-white p-32"
        >
          <p className="text-[2.8rem] font-bold">
            Form Tambah {convertSlugToText(fourthPathname)}
          </p>
          <div className="grid grid-cols-2 gap-32">
            <SelectListJenisJabatan
              useFormReturn={form}
              name="jenisJabatan"
              headerLabel="Jenis Jabatan"
              placeholder="Pilih Jenis Jabatan"
              className="w-full"
              isDisabled={isLoadingSaveJabatan}
            />
            <SelectListSatuanKerjaJabatan
              useFormReturn={form}
              name="namaUnor"
              headerLabel="Satuan Kerja"
              placeholder="Pilih Satuan Kerja"
              className="w-full"
              isDisabled={isLoadingSaveJabatan}
            />

            <FormLabelInput
              name="tmtJabatan"
              form={form}
              label="TMT Jabatan"
              placeholder="Masukkan TMT Jabatan"
              className="col-span-1 text-sim-dark phones:col-span-2"
              type="date"
              isDisabled={isLoadingSaveJabatan}
            />
            <FormLabelInput
              name="nomorSk"
              form={form}
              label="Nomor SK"
              placeholder="Masukkan Nomor SK"
              className="col-span-1 text-sim-dark phones:col-span-2"
              type="text"
              isDisabled={isLoadingSaveJabatan}
            />
            <FormLabelInput
              name="tanggalSk"
              form={form}
              label="Tanggal SK"
              placeholder="Masukkan Tanggal SK"
              className="col-span-1 text-sim-dark phones:col-span-2"
              type="date"
              isDisabled={isLoadingSaveJabatan}
            />
            <FormLabelInput
              name="tmtPelantikan"
              form={form}
              label="TMT Pelantikan"
              placeholder="Masukkan TMT Pelantikan"
              className="col-span-1 text-sim-dark phones:col-span-2"
              type="date"
              isDisabled={isLoadingSaveJabatan}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoadingSaveJabatan}
              className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              Simpan
            </button>
          </div>
        </form>
      </Form>
      <ToastContainer />
    </>
  )
}

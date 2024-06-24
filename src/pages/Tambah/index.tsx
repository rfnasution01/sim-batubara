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

export default function TambahPage() {
  const form = useForm<zod.infer<typeof TambahSchema>>({
    resolver: zodResolver(TambahSchema),
    defaultValues: {},
  })

  const handleSubmit = async (values: JabatanType) => {
    const body = {
      jenisJabatan: values?.jenisJabatan,
      namaUnor: values?.namaUnor,
      namaJabatan: values?.namaJabatan,
      tmtJabatan: values?.tmtJabatan,
      nomorSk: values?.nomorSk,
      tanggalSk: values?.tanggalSk,
      path: values?.path,
    }
    console.log({ body })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-32 rounded-3x bg-white p-32"
      >
        <p className="text-[2.8rem] font-bold">Form Tambah Jabatan</p>
        <div className="grid grid-cols-2 gap-32">
          <SelectListJenisJabatan
            useFormReturn={form}
            name="jenisJabatan"
            headerLabel="Jenis Jabatan"
            placeholder="Pilih Jenis Jabatan"
            className="w-full"
          />
          <SelectListSatuanKerjaJabatan
            useFormReturn={form}
            name="namaUnor"
            headerLabel="Satuan Kerja"
            placeholder="Pilih Satuan Kerja"
            className="w-full"
          />
          <FormLabelInput
            name="namaJabatan"
            form={form}
            label="Nama Jabatan"
            placeholder="Masukkan Nama Jabatan"
            className="col-span-1 text-sim-dark phones:col-span-2"
            type="text"
            //   isDisabled={isLoading}
          />

          <FormLabelInput
            name="tmtJabatan"
            form={form}
            label="TMT Jabatan"
            placeholder="Masukkan TMT Jabatan"
            className="col-span-1 text-sim-dark phones:col-span-2"
            type="text"
            //   isDisabled={isLoading}
          />
          <FormLabelInput
            name="nomorSk"
            form={form}
            label="Nomor SK"
            placeholder="Masukkan Nomor SK"
            className="col-span-1 text-sim-dark phones:col-span-2"
            type="text"
            //   isDisabled={isLoading}
          />
          <FormLabelInput
            name="tanggalSk"
            form={form}
            label="Tanggal SK"
            placeholder="Masukkan Tanggal SK"
            className="col-span-1 text-sim-dark phones:col-span-2"
            type="date"
            //   isDisabled={isLoading}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80"
          >
            <Save size={16} />
            Simpan
          </button>
        </div>
      </form>
    </Form>
  )
}

import { IconFlower } from '@/assets'
import { greetings } from '@/libs/helpers/greatings'

import { SelectListSatuanKerjaDashboard } from '@/components/SelectComponent'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { Dispatch, SetStateAction } from 'react'

export function DashboardHeader({
  form,
  setSatuanKerja,
}: {
  form: UseFormReturn
  setSatuanKerja: Dispatch<SetStateAction<string>>
}) {
  const satuanKerja = form.watch('satuanKerja')

  return (
    <div className="flex items-center gap-32 rounded-2x bg-white p-32 text-sim-dark">
      <div className="flex flex-col gap-8">
        <p className="text-sim-grey">
          Halo, {greetings()} <span className="text-[2.4rem]">&#128075;</span>
        </p>
        <p className="text-[2.8rem] font-bold">System Administrator</p>
      </div>
      <Form {...form}>
        <form className="flex flex-1 items-center gap-32 border-l border-sim-pale-grey px-32">
          <SelectListSatuanKerjaDashboard
            name="satuanKerja"
            useFormReturn={form}
            headerLabel="Satuan Kerja"
            placeholder="Pilih Satuan Kerja"
          />
          <button
            type="button"
            onClick={() => setSatuanKerja(satuanKerja)}
            className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white"
          >
            Terapkan <IconFlower />
          </button>
        </form>
      </Form>
    </div>
  )
}

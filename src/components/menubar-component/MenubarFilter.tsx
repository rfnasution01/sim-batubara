import { Check, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '../Menubar'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FilterSchema } from '@/libs/schema'
import { Form } from '../Form'
import { SelectListGolongan, SelectListSatuanKerja } from '../SelectComponent'
import { FormLabelInput } from '../InputComponent'

export function MenubarFilter() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCloseMenubarContent = () => {
    setIsMenuOpen(false)
  }

  const form = useForm<zod.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {},
  })

  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
        >
          <div className="flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-16 text-sim-dark hover:bg-sim-dark hover:text-white">
            <span className={`rounded-2xl`}>
              <SlidersHorizontal size={16} />
            </span>
            <p>Filter</p>
          </div>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="shadow-grey-light-1 absolute -right-[13rem] top-[1rem] w-[50rem] rounded-2xl text-[2rem] transition-all duration-300">
            <Form {...form}>
              <form className="scrollbar flex h-full flex-col gap-16 overflow-y-auto bg-white p-24">
                <SelectListSatuanKerja
                  useFormReturn={form}
                  name="satuanKerja"
                  headerLabel="Satuan Kerja"
                  placeholder="Pilih Golongan"
                  className="w-full"
                />
                <FormLabelInput
                  name="jabatan"
                  type="text"
                  form={form}
                  label="Jabatan"
                  placeholder="Guru, staff dan lainnya"
                  className="text-sim-dark"
                />
                <SelectListGolongan
                  useFormReturn={form}
                  name="golongan"
                  headerLabel="Golongan"
                  placeholder="Pilih Golongan"
                  className="w-full"
                />
                <div className="flex">
                  {' '}
                  <button
                    type="button"
                    onClick={handleCloseMenubarContent}
                    className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80"
                  >
                    <Check size={16} />
                    Terapkan
                  </button>
                </div>
              </form>
            </Form>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}

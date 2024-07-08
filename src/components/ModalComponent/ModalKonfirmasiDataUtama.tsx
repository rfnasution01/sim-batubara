import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { PencilLine, X } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ModalShowKonfirmasiDataUtama({
  isOpen,
  setIsOpen,
  children,
  form,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  form: UseFormReturn
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: '80%',
          maxHeight: '80%',
        }}
      >
        <div className="flex flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-center text-[2.4rem] font-bold phones:text-[2.8rem]">
                Konfirmasi
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <p className="text-center text-[2.4rem] text-sim-grey">
            Apakah data SIMPEG yang anda masukkan sudah benar?
          </p>
          <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
            <thead className="relative z-10 align-top leading-medium">
              <tr>
                <th
                  className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
                ></th>
                <th
                  className={`sticky top-0 w-[40%] border bg-sim-pale-primary px-24 py-24 text-left align-middle text-sim-dark`}
                >
                  Data SIASN BKN
                </th>
                <th
                  className={`sticky top-0 w-[40%] border bg-sim-pale-primary px-24 py-24 text-left align-middle text-sim-dark`}
                >
                  Data SIMPEG Batu Bara
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Agama
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('agama') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('agama') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Alamat
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('alamat') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('alamat') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Email
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('email') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('email') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Email Pemerintahan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('emailGov') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('emailGov') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Karis Karsu
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('karis_karsu') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('karis_karsu') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Kelas Jabatan
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('kelas_jabatan') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('kelas_jabatan') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  BPJS
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('bpjs') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('bpjs') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  No. Hp
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('noHp') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('npHp') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  No. Telp
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('noTelp') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('noTelp') ?? '-'}
                </td>
              </tr>

              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  No. NPWP
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('noNpwp') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('noNpwp') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal NPWP
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('tglNpwp') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('tglNpwp') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  Tanggal Taspen
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('tanggal_taspen') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('tanggal_taspen') ?? '-'}
                </td>
              </tr>
              <tr className="transition-all ease-in hover:cursor-pointer">
                <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                  No Taspen
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form?.watch('noTaspen') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('noTaspen') ?? '-'}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-center gap-32 text-[2rem]">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-sim-dark hover:bg-sim-dark hover:text-white disabled:cursor-not-allowed"
            >
              <PencilLine size={16} />
              Ubah Data
            </button>
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

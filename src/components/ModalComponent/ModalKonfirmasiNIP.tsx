import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { PencilLine, X } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ModalShowKonfirmasiNIP({
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
                  NIP Baru
                </th>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('nip') ?? '-'}
                </td>
                <td className="border px-24 py-12 align-middle leading-medium">
                  {form.watch('nip') ?? '-'}
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

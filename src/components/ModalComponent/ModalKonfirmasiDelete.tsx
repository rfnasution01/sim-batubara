import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ArrowLeft, Loader2, Trash, X } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '../Form'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ModalShowKonfirmasiDelete({
  isOpen,
  isLoading,
  setIsOpen,
  form,
  id,
  handleDeleteJabatan,
}: {
  isOpen: boolean
  isLoading: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  form: UseFormReturn
  id: string
  handleDeleteJabatan: (id: string) => Promise<void>
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
            Apakah anda yakin ingin menghapus data?
          </p>
          <Form {...form}>
            <form
              className="flex items-center justify-center gap-32 text-[2rem]"
              // onSubmit={form.handleSubmit(handleDeleteJabatan(id))}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-sim-dark hover:bg-sim-dark hover:text-white disabled:cursor-not-allowed"
              >
                <ArrowLeft size={16} />
                Kembali
              </button>
              <button
                type="button"
                onClick={() => handleDeleteJabatan(id)}
                disabled={isLoading}
                className="flex items-center gap-12 rounded-2xl border bg-danger px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin duration-300">
                    <Loader2 size={16} />
                  </div>
                ) : (
                  <Trash size={16} />
                )}
                Hapus
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

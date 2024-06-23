import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, XCircle } from 'lucide-react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ModalCheckID({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
        style={{
          width: '30%',
        }}
      >
        <div className="flex flex-col gap-16 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
                Informasi
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          <div className="flex flex-col items-center justify-center gap-32 text-[2.8rem] text-danger-700">
            <XCircle size={180} />
            <p
              className="text-justify text-sim-dark"
              style={{ lineHeight: '130%' }}
            >
              Maaf, data ID anda masih ada yang kosong atau tidak sama. Silahkan
              lakukan{' '}
              <span className="font-bold text-danger">sinkronisasi</span> data
              terlebih dahulu
            </p>
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-danger-700 px-24 py-16 text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useGetDokumenKepegawaianQuery } from '@/store/slices/kepegawaianAPI'
import { Loading } from '../Loading'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ModalShowFile({
  isOpen,
  setIsOpen,
  uri,
  nama,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  uri: string
  nama: string
}) {
  const [dokumen, setDokumen] = useState<string>('')

  const { data, isFetching, isLoading } = useGetDokumenKepegawaianQuery(
    {
      dok_uri: uri,
    },
    { skip: !uri },
  )

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      setDokumen(url)

      return () => {
        // Bersihkan URL objek setelah selesai
        window.URL.revokeObjectURL(url)
      }
    }
  }, [data])

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
              <p className="text-[2.4rem] font-bold phones:text-[2.8rem]">
                Informasi {nama}
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          <div className="flex flex-col items-center justify-center gap-32 text-[2.8rem] text-danger-700">
            {loading ? (
              <Loading width="6rem" height="6rem" />
            ) : (
              <>
                {dokumen ? (
                  <iframe
                    id="dlRetpdfPreview"
                    width="60"
                    style={{ width: '100%', height: '800px' }}
                    // src={`data:application/pdf;${dokumen}`}
                    src={dokumen}
                  />
                ) : (
                  <p>Terjadi masalah ketika menampilkan file</p>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

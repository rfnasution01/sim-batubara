import {
  useGetKepegawaianPNSUtamaQuery,
  useLazyGetSinkronPNSUtamaQuery,
} from '@/store/slices/kepegawaianAPI'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useEffect } from 'react'
import { Bounce, toast } from 'react-toastify'

export function SinkronData({ idPegawai }: { idPegawai: string }) {
  const { refetch } = useGetKepegawaianPNSUtamaQuery(
    {
      id_pegawai: idPegawai,
    },
    { skip: !idPegawai },
  )

  const [
    triggerSync,
    {
      isLoading: sinkronDataIsLoading,
      isFetching: sinkronDataIsFetching,
      isSuccess: sinkronDataIsSuccess,
    },
  ] = useLazyGetSinkronPNSUtamaQuery()

  const isLoadingsinkronData = sinkronDataIsFetching || sinkronDataIsLoading

  useEffect(() => {
    if (sinkronDataIsSuccess) {
      toast.success('Data berhasil di sinkronkan', {
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
        refetch()
      }, 1000)
    }
  }, [sinkronDataIsSuccess])

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => triggerSync({ id_pegawai: idPegawai })}
        type="button"
        className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white"
      >
        Sinkron Data{' '}
        {isLoadingsinkronData ? (
          <div className="animate-spin duration-300">
            <Loader2 size={16} />
          </div>
        ) : (
          <RefreshCcw size={16} />
        )}
      </button>
    </div>
  )
}

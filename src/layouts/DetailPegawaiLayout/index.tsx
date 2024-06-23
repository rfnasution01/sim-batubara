import { Loading } from '@/components/Loading'
import { DataDetailPegawai, ProfilPegawai } from '@/features/DetailPegawai'
import {
  DataKepegawaianUtamaHeaderType,
  DataKepegawaianUtamaType,
} from '@/libs/type'
import {
  useCreateSinkronPNSUtamaMutation,
  useCreateSinkronRiwayatGolonganMutation,
  useCreateSinkronRiwayatJabatanMutation,
  useCreateSinkronRiwayatPendidikanMutation,
  useGetKepegawaianPNSUtamaQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { SinkronSchema } from '@/libs/schema'

export default function DetailPegawaiLayoutMain() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')

  const form = useForm<zod.infer<typeof SinkronSchema>>({
    resolver: zodResolver(SinkronSchema),
    defaultValues: {},
  })

  // --- Data Utama ---
  const [kepegawaianUtama, setKepegawaianUtama] =
    useState<DataKepegawaianUtamaType>()
  const [kepegawaianUtamaHeader, setKepegawaianUtamaHeader] =
    useState<DataKepegawaianUtamaHeaderType>()

  const {
    data: kepegawaianUtamaData,
    isLoading: kepegawaianUtamaIsLoading,
    isFetching: kepegawaianUtamaIsFetching,
    error,
  } = useGetKepegawaianPNSUtamaQuery(
    {
      id_pegawai: idParams,
    },
    { skip: !idParams },
  )

  const isLoadingKepegawaianUtama =
    kepegawaianUtamaIsLoading || kepegawaianUtamaIsFetching

  useEffect(() => {
    if (kepegawaianUtamaData) {
      setKepegawaianUtama(kepegawaianUtamaData?.data)
      setKepegawaianUtamaHeader(kepegawaianUtamaData?.header)
    }
    const errorMsg = error as {
      data?: {
        message?: string
      }
    }

    if (errorMsg?.data?.message === 'Token Tidak Sesuai') {
      Cookies.remove('token')
      navigate('/login')
    }
  }, [kepegawaianUtamaData, idParams, error])

  // --- Sinkron Data Utama ---
  const [
    createSinkron,
    {
      isError: isErrorSinkron,
      error: errorSinkron,
      isLoading: isLoadingSinkron,
      isSuccess: isSuccessSinkron,
    },
  ] = useCreateSinkronPNSUtamaMutation()

  const handleSubmitDataUtama = async () => {
    try {
      await createSinkron({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkron) {
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
    }
  }, [isSuccessSinkron])

  useEffect(() => {
    if (isErrorSinkron) {
      const errorMsg = errorSinkron as { data?: { message?: string } }

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
  }, [isErrorSinkron, errorSinkron])

  // --- Sinkron Riwayat Golongan ---
  const [
    createSinkronRiwayatGolongan,
    {
      isError: isErrorSinkronRiwayatGolongan,
      error: errorSinkronRiwayatGolongan,
      isLoading: isLoadingSinkronRiwayatGolongan,
      isSuccess: isSuccessSinkronRiwayatGolongan,
    },
  ] = useCreateSinkronRiwayatGolonganMutation()

  const handleSubmitRiwayatGolongan = async () => {
    try {
      await createSinkronRiwayatGolongan({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatGolongan) {
      toast.success('Data riwayat golongan berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatGolongan])

  useEffect(() => {
    if (isErrorSinkronRiwayatGolongan) {
      const errorMsg = errorSinkronRiwayatGolongan as {
        data?: { message?: string }
      }

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
  }, [isErrorSinkronRiwayatGolongan, errorSinkronRiwayatGolongan])

  // --- Sinkron Riwayat Pendidikan ---
  const [
    createSinkronRiwayatPendidikan,
    {
      isError: isErrorSinkronRiwayatPendidikan,
      error: errorSinkronRiwayatPendidikan,
      isLoading: isLoadingSinkronRiwayatPendidikan,
      isSuccess: isSuccessSinkronRiwayatPendidikan,
    },
  ] = useCreateSinkronRiwayatPendidikanMutation()

  const handleSubmitRiwayatPendidikan = async () => {
    try {
      await createSinkronRiwayatPendidikan({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatPendidikan) {
      toast.success('Data riwayat pendidikan berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatPendidikan])

  useEffect(() => {
    if (isErrorSinkronRiwayatPendidikan) {
      const errorMsg = errorSinkronRiwayatPendidikan as {
        data?: { message?: string }
      }

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
  }, [isErrorSinkronRiwayatPendidikan, errorSinkronRiwayatPendidikan])

  // --- Sinkron Riwayat Jabatan ---
  const [
    createSinkronRiwayatJabatan,
    {
      isError: isErrorSinkronRiwayatJabatan,
      error: errorSinkronRiwayatJabatan,
      isLoading: isLoadingSinkronRiwayatJabatan,
      isSuccess: isSuccessSinkronRiwayatJabatan,
    },
  ] = useCreateSinkronRiwayatJabatanMutation()

  const handleSubmitRiwayatJabatan = async () => {
    try {
      await createSinkronRiwayatJabatan({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatJabatan) {
      toast.success('Data riwayat jabatan berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatJabatan])

  useEffect(() => {
    if (isErrorSinkronRiwayatJabatan) {
      const errorMsg = errorSinkronRiwayatJabatan as {
        data?: { message?: string }
      }

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
  }, [isErrorSinkronRiwayatJabatan, errorSinkronRiwayatJabatan])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <>
          {/* --- Profil --- */}
          <ProfilPegawai data={kepegawaianUtamaHeader} />
          {/* --- Data --- */}
          <DataDetailPegawai
            data={kepegawaianUtama}
            idPegawai={idParams}
            handleSubmitDataUtama={handleSubmitDataUtama}
            isSinkronDataUtama={isLoadingSinkron}
            form={form}
            handleSubmitRiwayatGolongan={handleSubmitRiwayatGolongan}
            isSinkronRiwayatGolongan={isLoadingSinkronRiwayatGolongan}
            handleSubmitRiwayatPendidikan={handleSubmitRiwayatPendidikan}
            isSinkronRiwayatPendidikan={isLoadingSinkronRiwayatPendidikan}
            handleSubmitRiwayatJabatan={handleSubmitRiwayatJabatan}
            isSinkronRiwayatJabatan={isLoadingSinkronRiwayatJabatan}
          />
        </>
      )}
      <ToastContainer />
    </div>
  )
}

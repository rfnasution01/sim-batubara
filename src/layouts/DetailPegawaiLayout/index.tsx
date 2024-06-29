import { Loading } from '@/components/Loading'
import { DataDetailPegawai, ProfilPegawai } from '@/features/DetailPegawai'
import {
  DataKepegawaianUtamaHeaderType,
  DataKepegawaianUtamaType,
} from '@/libs/type'
import {
  useCreateSinkronAngkaKreditMutation,
  useCreateSinkronPNSUtamaMutation,
  useCreateSinkronRiwayatDiklatLainnyaMutation,
  useCreateSinkronRiwayatDiklatMutation,
  useCreateSinkronRiwayatGolonganMutation,
  useCreateSinkronRiwayatJabatanMutation,
  useCreateSinkronRiwayatPMKMutation,
  useCreateSinkronRiwayatPendidikanMutation,
  useCreateSinkronRiwayatPenghargaanMutation,
  useCreateSinkronRiwayatPindahInstansiMutation,
  useDeleteAngkaKreditMutation,
  useDeleteDiklatMutation,
  useDeleteJabatanMutation,
  useDeleteKursusMutation,
  useDeletePenghargaanMutation,
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
import { DeleteSchema, SinkronSchema } from '@/libs/schema'

export default function DetailPegawaiLayoutMain() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')

  const form = useForm<zod.infer<typeof SinkronSchema>>({
    resolver: zodResolver(SinkronSchema),
    defaultValues: {},
  })

  const formDelete = useForm<zod.infer<typeof DeleteSchema>>({
    resolver: zodResolver(DeleteSchema),
    defaultValues: {},
  })

  // --- Delete Jabatan ---
  const [
    deleteJabatan,
    {
      isSuccess: deleteJabatanSuccess,
      isError: deleteJabatanIsError,
      error: deleteJabatanError,
      isLoading: deleteJabatanLoading,
    },
  ] = useDeleteJabatanMutation()

  const handleDeleteJabatan = async (id: string) => {
    try {
      await deleteJabatan({
        id: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (deleteJabatanSuccess) {
      toast.success('Data berhasil di delete', {
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
  }, [deleteJabatanSuccess])

  useEffect(() => {
    if (deleteJabatanIsError) {
      const errorMsg = deleteJabatanError as { data?: { message?: string } }

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
  }, [deleteJabatanIsError, deleteJabatanError])

  // --- Delete Diklat ---
  const [
    deleteDiklat,
    {
      isSuccess: deleteDiklatSuccess,
      isError: deleteDiklatIsError,
      error: deleteDiklatError,
      isLoading: deleteDiklatLoading,
    },
  ] = useDeleteDiklatMutation()

  const handleDeleteDiklat = async (id: string) => {
    try {
      await deleteDiklat({
        id: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (deleteDiklatSuccess) {
      toast.success('Data berhasil di delete', {
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
  }, [deleteDiklatSuccess])

  useEffect(() => {
    if (deleteDiklatIsError) {
      const errorMsg = deleteDiklatError as { data?: { message?: string } }

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
  }, [deleteDiklatIsError, deleteDiklatError])

  // --- Delete Kursus ---
  const [
    deleteKursus,
    {
      isSuccess: deleteKursusSuccess,
      isError: deleteKursusIsError,
      error: deleteKursusError,
      isLoading: deleteKursusLoading,
    },
  ] = useDeleteKursusMutation()

  const handleDeleteKursus = async (id: string) => {
    try {
      await deleteKursus({
        id: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (deleteKursusSuccess) {
      toast.success('Data berhasil di delete', {
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
  }, [deleteKursusSuccess])

  useEffect(() => {
    if (deleteKursusIsError) {
      const errorMsg = deleteKursusError as { data?: { message?: string } }

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
  }, [deleteKursusIsError, deleteKursusError])

  // --- Delete Penghargaan ---
  const [
    deletePenghargaan,
    {
      isSuccess: deletePenghargaanSuccess,
      isError: deletePenghargaanIsError,
      error: deletePenghargaanError,
      isLoading: deletePenghargaanLoading,
    },
  ] = useDeletePenghargaanMutation()

  const handleDeletePenghargaan = async (id: string) => {
    try {
      await deletePenghargaan({
        id: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (deletePenghargaanSuccess) {
      toast.success('Data berhasil di delete', {
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
  }, [deletePenghargaanSuccess])

  useEffect(() => {
    if (deletePenghargaanIsError) {
      const errorMsg = deletePenghargaanError as { data?: { message?: string } }

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
  }, [deletePenghargaanIsError, deletePenghargaanError])

  // --- Delete Kredit ---
  const [
    deleteAngkaKredit,
    {
      isSuccess: deleteAngkaKreditSuccess,
      isError: deleteAngkaKreditIsError,
      error: deleteAngkaKreditError,
      isLoading: deleteAngkaKreditLoading,
    },
  ] = useDeleteAngkaKreditMutation()

  const handleDeleteAngkaKredit = async (id: string) => {
    try {
      await deleteAngkaKredit({
        id: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (deleteAngkaKreditSuccess) {
      toast.success('Data berhasil di delete', {
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
  }, [deleteAngkaKreditSuccess])

  useEffect(() => {
    if (deleteAngkaKreditIsError) {
      const errorMsg = deleteAngkaKreditError as { data?: { message?: string } }

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
  }, [deleteAngkaKreditIsError, deleteAngkaKreditError])

  // --- Data Utama ---
  const [kepegawaianUtama, setKepegawaianUtama] =
    useState<DataKepegawaianUtamaType>()
  const [kepegawaianUtamaHeader, setKepegawaianUtamaHeader] =
    useState<DataKepegawaianUtamaHeaderType>()

  const {
    data: kepegawaianUtamaData,
    isLoading: kepegawaianUtamaIsLoading,
    isFetching: kepegawaianUtamaIsFetching,
    isSuccess,
    isError,
    error: kepegawaianError,
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
    const errorMsg = kepegawaianError as {
      data?: {
        message?: string
      }
    }

    if (
      errorMsg?.data?.message === 'Token Expired' ||
      errorMsg?.data?.message === 'Token Tidak Sesuai'
    ) {
      Cookies.remove('token')
      navigate('/login')
    }

    if (
      errorMsg?.data?.message?.includes('Client error') ||
      errorMsg?.data?.message?.includes('Server error')
    ) {
      toast.error(`Terjadi Kesalahan di server BKN`, {
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
  }, [kepegawaianUtamaData, idParams, kepegawaianError])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Data profil pegawai berhasil di muat', {
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
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      const errorMsg = kepegawaianError as { data?: { message?: string } }

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
  }, [isError, kepegawaianError])

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

  // --- Sinkron Riwayat PMK ---
  const [
    createSinkronRiwayatPMK,
    {
      isError: isErrorSinkronRiwayatPMK,
      error: errorSinkronRiwayatPMK,
      isLoading: isLoadingSinkronRiwayatPMK,
      isSuccess: isSuccessSinkronRiwayatPMK,
    },
  ] = useCreateSinkronRiwayatPMKMutation()

  const handleSubmitRiwayatPMK = async () => {
    try {
      await createSinkronRiwayatPMK({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatPMK) {
      toast.success('Data riwayat masa kerja berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatPMK])

  useEffect(() => {
    if (isErrorSinkronRiwayatPMK) {
      const errorMsg = errorSinkronRiwayatPMK as {
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
  }, [isErrorSinkronRiwayatPMK, errorSinkronRiwayatPMK])

  // --- Sinkron Riwayat PindahInstansi ---
  const [
    createSinkronRiwayatPindahInstansi,
    {
      isError: isErrorSinkronRiwayatPindahInstansi,
      error: errorSinkronRiwayatPindahInstansi,
      isLoading: isLoadingSinkronRiwayatPindahInstansi,
      isSuccess: isSuccessSinkronRiwayatPindahInstansi,
    },
  ] = useCreateSinkronRiwayatPindahInstansiMutation()

  const handleSubmitRiwayatPindahInstansi = async () => {
    try {
      await createSinkronRiwayatPindahInstansi({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatPindahInstansi) {
      toast.success('Data riwayat pindah instansi berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatPindahInstansi])

  useEffect(() => {
    if (isErrorSinkronRiwayatPindahInstansi) {
      const errorMsg = errorSinkronRiwayatPindahInstansi as {
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
  }, [isErrorSinkronRiwayatPindahInstansi, errorSinkronRiwayatPindahInstansi])

  // --- Sinkron Riwayat Diklat ---
  const [
    createSinkronRiwayatDiklat,
    {
      isError: isErrorSinkronRiwayatDiklat,
      error: errorSinkronRiwayatDiklat,
      isLoading: isLoadingSinkronRiwayatDiklat,
      isSuccess: isSuccessSinkronRiwayatDiklat,
    },
  ] = useCreateSinkronRiwayatDiklatMutation()

  const handleSubmitRiwayatDiklat = async () => {
    try {
      await createSinkronRiwayatDiklat({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatDiklat) {
      toast.success('Data riwayat diklat berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatDiklat])

  useEffect(() => {
    if (isErrorSinkronRiwayatDiklat) {
      const errorMsg = errorSinkronRiwayatDiklat as {
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
  }, [isErrorSinkronRiwayatDiklat, errorSinkronRiwayatDiklat])

  // --- Sinkron Riwayat Diklat Lainnya ---
  const [
    createSinkronRiwayatDiklatLainnya,
    {
      isError: isErrorSinkronRiwayatDiklatLainnya,
      error: errorSinkronRiwayatDiklatLainnya,
      isLoading: isLoadingSinkronRiwayatDiklatLainnya,
      isSuccess: isSuccessSinkronRiwayatDiklatLainnya,
    },
  ] = useCreateSinkronRiwayatDiklatLainnyaMutation()

  const handleSubmitRiwayatDiklatLainnya = async () => {
    try {
      await createSinkronRiwayatDiklatLainnya({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronRiwayatDiklatLainnya) {
      toast.success('Data riwayat diklat lainnya berhasil disinkronkan', {
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
  }, [isSuccessSinkronRiwayatDiklatLainnya])

  useEffect(() => {
    if (isErrorSinkronRiwayatDiklatLainnya) {
      const errorMsg = errorSinkronRiwayatDiklatLainnya as {
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
  }, [isErrorSinkronRiwayatDiklatLainnya, errorSinkronRiwayatDiklatLainnya])

  // --- Sinkron Penghargaan ---
  const [
    createSinkronPenghargaan,
    {
      isError: isErrorSinkronPenghargaan,
      error: errorSinkronPenghargaan,
      isLoading: isLoadingSinkronPenghargaan,
      isSuccess: isSuccessSinkronPenghargaan,
    },
  ] = useCreateSinkronRiwayatPenghargaanMutation()

  const handleSubmitPenghargaan = async () => {
    try {
      await createSinkronPenghargaan({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronPenghargaan) {
      toast.success('Data penghargaan berhasil disinkronkan', {
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
  }, [isSuccessSinkronPenghargaan])

  useEffect(() => {
    if (isErrorSinkronPenghargaan) {
      const errorMsg = errorSinkronPenghargaan as {
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
  }, [isErrorSinkronPenghargaan, errorSinkronPenghargaan])

  // --- Sinkron AngkaKredit ---
  const [
    createSinkronAngkaKredit,
    {
      isError: isErrorSinkronAngkaKredit,
      error: errorSinkronAngkaKredit,
      isLoading: isLoadingSinkronAngkaKredit,
      isSuccess: isSuccessSinkronAngkaKredit,
    },
  ] = useCreateSinkronAngkaKreditMutation()

  const handleSubmitAngkaKredit = async () => {
    try {
      await createSinkronAngkaKredit({
        data: {
          id_pegawai: idParams,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSinkronAngkaKredit) {
      toast.success('Data angka kredit berhasil disinkronkan', {
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
  }, [isSuccessSinkronAngkaKredit])

  useEffect(() => {
    if (isErrorSinkronAngkaKredit) {
      const errorMsg = errorSinkronAngkaKredit as {
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
  }, [isErrorSinkronAngkaKredit, errorSinkronAngkaKredit])

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
            formDelete={formDelete}
            handleSubmitRiwayatPindahInstansi={
              handleSubmitRiwayatPindahInstansi
            }
            isSinkronRiwayatPindahInstansi={
              isLoadingSinkronRiwayatPindahInstansi
            }
            handleSubmitRiwayatGolongan={handleSubmitRiwayatGolongan}
            isSinkronRiwayatGolongan={isLoadingSinkronRiwayatGolongan}
            handleSubmitRiwayatPendidikan={handleSubmitRiwayatPendidikan}
            isSinkronRiwayatPendidikan={isLoadingSinkronRiwayatPendidikan}
            handleSubmitRiwayatJabatan={handleSubmitRiwayatJabatan}
            isSinkronRiwayatJabatan={isLoadingSinkronRiwayatJabatan}
            handleSubmitRiwayatDiklat={handleSubmitRiwayatDiklat}
            isSinkronRiwayatDiklat={isLoadingSinkronRiwayatDiklat}
            handleSubmitRiwayatDiklatLainnya={handleSubmitRiwayatDiklatLainnya}
            isSinkronRiwayatDiklatLainnya={isLoadingSinkronRiwayatDiklatLainnya}
            handleSubmitRiwayatPenghargaan={handleSubmitPenghargaan}
            isSinkronRiwayatPenghargaan={isLoadingSinkronPenghargaan}
            handleDeleteJabatan={handleDeleteJabatan}
            isLoadingDeleteJabatan={deleteJabatanLoading}
            handleDeleteDiklat={handleDeleteDiklat}
            isLoadingDeleteDiklat={deleteDiklatLoading}
            handleDeleteKursus={handleDeleteKursus}
            isLoadingDeleteKursus={deleteKursusLoading}
            handleDeletePenghargaan={handleDeletePenghargaan}
            isLoadingDeletePenghargaan={deletePenghargaanLoading}
            handleSubmitRiwayatPMK={handleSubmitRiwayatPMK}
            isSinkronRiwayatPMK={isLoadingSinkronRiwayatPMK}
            handleDeleteAngkaKredit={handleDeleteAngkaKredit}
            isLoadingDeleteAngkaKredit={deleteAngkaKreditLoading}
            handleSubmitRiwayatAngkaKredit={handleSubmitAngkaKredit}
            isSinkronRiwayatAngkaKredit={isLoadingSinkronAngkaKredit}
          />
        </>
      )}
      <ToastContainer />
    </div>
  )
}

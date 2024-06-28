import { Pagination } from '@/components/Pagination'
import { columnsListDataPNS } from '@/libs/helpers/table'
import { DataKepegawaianType, PageInfoType } from '@/libs/type'
import { getFilterSlice } from '@/store/reducer/stateFilter'
import { useGetKepegawaianPNSQuery } from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { TablePNS } from '@/components/TablePNS'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function PNS() {
  const navigate = useNavigate()
  const { pageNumber, pageSize, search, id_golongan, id_organisasi, jabatan } =
    useSelector(getFilterSlice)
  const [kepegawaianPNS, setKepegawaianPNS] = useState<DataKepegawaianType[]>(
    [],
  )
  const [pageInfo, setPageInfo] = useState<PageInfoType>()

  const {
    data: kepegawaianPNSData,
    isLoading: kepegawaianPNSIsLoading,
    isFetching: kepegawaianPNSIsFetching,
    isSuccess,
    isError,
    error,
  } = useGetKepegawaianPNSQuery({
    page_number: pageNumber ?? 1,
    page_size: pageSize ?? 10,
    search: search ?? '',
    id_golongan: id_golongan ?? '',
    id_organisasi: id_organisasi ?? '',
    jabatan: jabatan ?? '',
  })

  const isLoadingKepegawaianPNS =
    kepegawaianPNSIsFetching || kepegawaianPNSIsLoading

  useEffect(() => {
    if (kepegawaianPNSData) {
      setKepegawaianPNS(kepegawaianPNSData?.data)
      setPageInfo(kepegawaianPNSData?.page_info)
    }
    const errorMsg = error as {
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
      errorMsg?.data?.message.includes('Client error') ||
      errorMsg?.data?.message.includes('Server error')
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
  }, [
    kepegawaianPNSData,
    pageNumber,
    pageSize,
    search,
    id_golongan,
    id_organisasi,
    jabatan,
    error,
  ])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Data kepegawaian berhasil di muat', {
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
      const errorMsg = error as { data?: { message?: string } }

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
  }, [isError, error])

  return (
    <div className="flex h-full flex-col gap-32">
      <TablePNS
        data={kepegawaianPNS}
        columns={columnsListDataPNS}
        containerClasses="w-full h-full"
        loading={isLoadingKepegawaianPNS}
        isNumber
        pageSize={pageSize}
        currentPage={pageNumber}
        isPegawaiPNS
      />
      <div className="flex items-center justify-end">
        {kepegawaianPNS?.length > 0 && (
          <Pagination
            pageNow={pageNumber ?? 0}
            lastPage={pageInfo?.last_page ?? 0}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

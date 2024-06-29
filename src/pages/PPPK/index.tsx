import { Pagination } from '@/components/Pagination'
import { DataKepegawaianType, PageInfoType } from '@/libs/type'
import { getFilterSlice } from '@/store/reducer/stateFilter'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGetPPPKQuery } from '@/store/slices/pppkAPI'
import { TablePNS } from '@/components/TablePNS'
import { columnsListDataPNS } from '@/libs/helpers/table'

export default function PPPK() {
  const navigate = useNavigate()
  const { pageNumber, pageSize, search, id_golongan, id_organisasi, jabatan } =
    useSelector(getFilterSlice)
  const [kepegawaianPPPK, setKepegawaianPPPK] = useState<DataKepegawaianType[]>(
    [],
  )
  const [pageInfo, setPageInfo] = useState<PageInfoType>()

  const {
    data: kepegawaianPPPKData,
    isLoading: kepegawaianPPPKIsLoading,
    isFetching: kepegawaianPPPKIsFetching,
    isSuccess,
    isError,
    error,
  } = useGetPPPKQuery({
    page_number: pageNumber ?? 1,
    page_size: pageSize ?? 10,
    search: search ?? '',
    id_golongan: id_golongan ?? '',
    id_organisasi: id_organisasi ?? '',
    jabatan: jabatan ?? '',
  })

  const isLoadingKepegawaianPPPK =
    kepegawaianPPPKIsFetching || kepegawaianPPPKIsLoading

  useEffect(() => {
    if (kepegawaianPPPKData) {
      setKepegawaianPPPK(kepegawaianPPPKData?.data)
      setPageInfo(kepegawaianPPPKData?.page_info)
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
  }, [
    kepegawaianPPPKData,
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
        data={kepegawaianPPPK}
        columns={columnsListDataPNS}
        containerClasses="w-full h-full"
        loading={isLoadingKepegawaianPPPK}
        isNumber
        pageSize={pageSize}
        currentPage={pageNumber}
      />
      <div className="flex items-center justify-end">
        {kepegawaianPPPK?.length > 0 && (
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

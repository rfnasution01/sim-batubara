import { Pagination } from '@/components/Pagination'
import { Table } from '@/components/Table'
import { columnsListDataPNS } from '@/libs/helpers/table'
import { DataKepegawaianType, PageInfoType } from '@/libs/type'
import { getFilterSlice } from '@/store/reducer/stateFilter'
import { useGetKepegawaianPNSQuery } from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div className="flex h-full flex-col gap-32">
      <Table
        data={kepegawaianPNS}
        columns={columnsListDataPNS}
        containerClasses="w-full h-full"
        loading={isLoadingKepegawaianPNS}
        isNumber
        pageSize={pageSize}
        currentPage={pageNumber}
      />
      <div className="flex items-center justify-end">
        {kepegawaianPNS?.length > 0 && (
          <Pagination
            pageNow={pageNumber ?? 0}
            lastPage={pageInfo?.last_page ?? 0}
          />
        )}
      </div>
    </div>
  )
}

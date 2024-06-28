import {
  DashboardAksesCepat,
  DashboardDoughnutChart,
  DashboardHeader,
  DashboardJumlahPegawai,
} from '@/features/Dashboard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FilterSchema } from '@/libs/schema'
import { useEffect, useState } from 'react'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'
import { DashboardType } from '@/libs/type'
import { Loading } from '@/components/Loading'
import { toRoman } from '@/libs/helpers/format-text'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [satuanKerja, setSatuanKerja] = useState<string>('')

  const [dashboardData, setDashboardData] = useState<DashboardType>()

  const form = useForm<zod.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {},
  })

  const {
    data: getDashboard,
    isLoading: isLoadingDashboard,
    isFetching: isFetchingDashboard,
    error,
  } = useGetDashboardQuery({
    id_organisasi: satuanKerja ?? '',
  })

  useEffect(() => {
    if (getDashboard?.data) {
      const updatedData = {
        ...getDashboard?.data,
        golonganPegawai: getDashboard?.data?.golonganPegawai?.map((item) => ({
          nama: `Golongan ${toRoman(parseInt(item?.nama))}`,
          jlh: item?.jlh,
        })),
      }

      setDashboardData(updatedData)
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
  }, [getDashboard?.data, satuanKerja, error])

  return (
    <div className="flex flex-col gap-32">
      <DashboardHeader form={form} setSatuanKerja={setSatuanKerja} />
      {isFetchingDashboard || isLoadingDashboard ? (
        <Loading width={'9rem'} height={'9rem'} />
      ) : (
        <>
          {/* --- Baris 1 --- */}
          <div className="flex w-full  items-stretch gap-32">
            <DashboardJumlahPegawai
              jumlahPegawai={dashboardData?.jlhPegawai}
              jumlahSatuanKerja={dashboardData?.jlhSatker}
            />
            <DashboardDoughnutChart
              data={dashboardData?.kategoriPegawai}
              title="Kategori Kepegawaian"
            />
            <DashboardDoughnutChart
              data={dashboardData?.jenisPegawai}
              title="Jenis Kepegawaian"
            />
          </div>
          {/* --- Baris 2 --- */}

          <div className="flex w-full items-stretch gap-32">
            <DashboardDoughnutChart
              data={dashboardData?.golonganPegawai}
              title="Golongan PNS / CPNS"
            />
            <DashboardAksesCepat />
          </div>
        </>
      )}
    </div>
  )
}

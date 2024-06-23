import { Loading } from '@/components/Loading'
import { DataDetailPegawai, ProfilPegawai } from '@/features/DetailPegawai'
import {
  DataKepegawaianUtamaHeaderType,
  DataKepegawaianUtamaType,
} from '@/libs/type'
import { useGetKepegawaianPNSUtamaQuery } from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'

export default function DetailPegawaiLayoutMain() {
  const idParams = localStorage.getItem('pegawaiID')

  const [kepegawaianUtama, setKepegawaianUtama] =
    useState<DataKepegawaianUtamaType>()
  const [kepegawaianUtamaHeader, setKepegawaianUtamaHeader] =
    useState<DataKepegawaianUtamaHeaderType>()

  const {
    data: kepegawaianUtamaData,
    isLoading: kepegawaianUtamaIsLoading,
    isFetching: kepegawaianUtamaIsFetching,
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
  }, [kepegawaianUtamaData, idParams])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <>
          {/* --- Profil --- */}
          <ProfilPegawai data={kepegawaianUtamaHeader} />
          {/* --- Data --- */}
          <DataDetailPegawai data={kepegawaianUtama} />
        </>
      )}
    </div>
  )
}

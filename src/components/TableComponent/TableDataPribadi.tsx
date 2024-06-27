import { DataKepegawaianUtamaType } from '@/libs/type'
import { RefreshCcw } from 'lucide-react'
import { Loading } from '../Loading'
import { UseFormReturn } from 'react-hook-form'
import { Form } from '../Form'
import dayjs from 'dayjs'

export function TableDataPribadi({
  data,
  handleSubmitDataUtama,
  form,
  isSinkronDataUtama,
}: {
  data: DataKepegawaianUtamaType
  handleSubmitDataUtama: () => Promise<void>
  form: UseFormReturn
  isSinkronDataUtama: boolean
}) {
  return (
    <div
      className={`scrollbar flex flex-col overflow-auto rounded-3x`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="flex flex-col gap-12 rounded-3x">
        {isSinkronDataUtama ? (
          <Loading width={'6rem'} height={'6rem'} />
        ) : (
          <>
            <p className="text-sim-grey">
              Sinkronisasi Terakhir:{' '}
              {data?.last_update
                ? dayjs(data?.last_update)
                    .locale('id')
                    .format('DD/MM/YYYY | HH:mm')
                : 'Belum Sinkronisasi'}
            </p>
            <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
              <thead className="relative z-10 align-top leading-medium">
                <tr>
                  <th
                    className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
                  >
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmitDataUtama)}>
                        <button
                          type="submit"
                          className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white"
                        >
                          Sinkron Data <RefreshCcw size={16} />
                        </button>
                      </form>
                    </Form>
                  </th>
                  <th
                    className={`sticky top-0 w-[40%] border bg-sim-pale-primary px-24 py-24 text-left align-middle text-sim-dark`}
                  >
                    Data SIASN BKN
                  </th>
                  <th
                    className={`sticky top-0 w-[40%] border bg-sim-pale-primary px-24 py-24 text-left align-middle text-sim-dark`}
                  >
                    Data SIMPEG Batu Bara
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    ID
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.ID ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.ID ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    NIP
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.nip ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.nip ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Nama
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.nama ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.nama ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Jenis Kelamin
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.jenis_kelamin ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.jenis_kelamin ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Tempat Lahir
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.tempat_lahir ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.tempat_lahir ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Tanggal Lahir
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.tanggal_lahir ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.tanggal_lahir ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Agama
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.agama ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.agama ?? '-'}
                  </td>
                </tr>
                <tr className="border transition-all ease-in hover:cursor-pointer">
                  <td
                    className="border px-24 py-12 align-middle leading-medium text-white"
                    colSpan={3}
                  >
                    #
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Alamat
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.alamat ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.alamat ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Kelurahan
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.kelurahan ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.kelurahan ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Kecatamatan
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.kecamatan ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.kecamatan ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Kota
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.kabupaten ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.kabupaten ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Provinsi
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.provinsi ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.provinsi ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    POS
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.kodepos ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.kodepos ?? '-'}
                  </td>
                </tr>
                <tr className="border transition-all ease-in hover:cursor-pointer">
                  <td
                    className="border px-24 py-12 align-middle leading-medium text-white"
                    colSpan={3}
                  >
                    #
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Nomor Telepon
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.hp ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.hp ?? '-'}
                  </td>
                </tr>
                <tr className="transition-all ease-in hover:cursor-pointer">
                  <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
                    Email
                  </th>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.siasn?.email ?? '-'}
                  </td>
                  <td className="border px-24 py-12 align-middle leading-medium">
                    {data?.lokal?.email ?? '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

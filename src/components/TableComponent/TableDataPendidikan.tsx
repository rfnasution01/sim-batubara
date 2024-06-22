import { RefreshCcw } from 'lucide-react'

export function TableDataPendidikan() {
  return (
    <div
      className={`scrollbar flex flex-col overflow-auto rounded-3x`}
      style={{ scrollbarGutter: 'stable' }}
    >
      <table className="flex-1 border-collapse rounded-3x bg-[#fcfcfc] text-24">
        <thead className="relative z-10 align-top leading-medium">
          <tr>
            <th
              className={`sticky top-0 w-[20%] border px-24 py-16 text-left align-middle text-sim-dark`}
            >
              <div className="flex items-center justify-center">
                <div className="text-dark flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 text-[1.8rem] hover:cursor-pointer hover:border-transparent hover:bg-sim-dark hover:text-white">
                  Sinkron Data <RefreshCcw size={16} />
                </div>
              </div>
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
              Jenjang Pendidikan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Tanggal Ijazah
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nomor Ijazah
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nama Instansi
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Gelar Depan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Gelar Belakang
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
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
              Jenjang Pendidikan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Tanggal Ijazah
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nomor Ijazah
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nama Instansi
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
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
              Jenjang Pendidikan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Tanggal Ijazah
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nomor Ijazah
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nama Instansi
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
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
              Jenjang Pendidikan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Tanggal Ijazah
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nomor Ijazah
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nama Instansi
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td className="border px-24 py-12 align-middle leading-medium">
              A8ACA774D0673912E040640A040269BB
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

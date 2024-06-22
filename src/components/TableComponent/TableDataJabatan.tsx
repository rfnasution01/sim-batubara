import { Plus, RefreshCcw } from 'lucide-react'

export function TableDataJabatan() {
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
              Jenis Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td
              className="border px-24 py-12 text-center align-middle leading-medium"
              rowSpan={7}
            >
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 hover:animate-bounce">
                  <span className="rounded-full bg-sim-dark p-8 text-white">
                    <Plus size={12} />
                  </span>
                  <p className="text-sim-dark">Tambah Data</p>
                </div>
              </div>
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Satuan Kerja
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nama Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              TMT Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nomor SK
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Tanggal SK
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              File
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          {/* -------------------------------- */}
          <tr className="border transition-all ease-in hover:cursor-pointer">
            <td
              className="border px-24 py-12 align-middle leading-medium text-white"
              colSpan={3}
            >
              #
            </td>
          </tr>
          {/* -------------------------------- */}
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Jenis Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td
              className="border px-24 py-12 text-center align-middle leading-medium"
              rowSpan={7}
            >
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 hover:animate-bounce">
                  <span className="rounded-full bg-sim-dark p-8 text-white">
                    <Plus size={12} />
                  </span>
                  <p className="text-sim-dark">Tambah Data</p>
                </div>
              </div>
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Satuan Kerja
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nama Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              TMT Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nomor SK
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Tanggal SK
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              File
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          {/* ---------------------------- */}
          <tr className="border transition-all ease-in hover:cursor-pointer">
            <td
              className="border px-24 py-12 align-middle leading-medium text-white"
              colSpan={3}
            >
              #
            </td>
          </tr>
          {/* ---------------------------- */}
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Jenis Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
            <td
              className="border px-24 py-12 text-center align-middle leading-medium"
              rowSpan={7}
            >
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-12 rounded-2xl border border-sim-dark px-24 py-12 hover:animate-bounce">
                  <span className="rounded-full bg-sim-dark p-8 text-white">
                    <Plus size={12} />
                  </span>
                  <p className="text-sim-dark">Tambah Data</p>
                </div>
              </div>
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Satuan Kerja
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nama Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              TMT Jabatan
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Nomor SK
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              Tanggal SK
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
          <tr className="transition-all ease-in hover:cursor-pointer">
            <th className="border bg-sim-pale-primary px-24 py-12 text-left align-middle leading-medium text-sim-dark">
              File
            </th>
            <td className="border px-24 py-12 align-middle leading-medium">
              -
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

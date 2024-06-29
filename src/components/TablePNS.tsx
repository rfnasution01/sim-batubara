import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Loading } from './Loading'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { useDispatch } from 'react-redux'
import { setStateDetailPegawai } from '@/store/reducer/stateDetailPegawai'
import { setStateDetailRiwayat } from '@/store/reducer/stateDetailRiwayat'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

export interface PegawaiPNS {
  satker: string
  nama: string
  id_pegawai: string
}

type Props<T extends PegawaiPNS, P> = {
  data: T[]
  columns: Column<T>[] | ((props: P) => Column<T>[])
  containerClasses?: string
  maxHeight?: string
  loading?: boolean
  columnProps?: P
  onItemClick?: (rowData: T) => void
  collapseComponent?: React.ReactNode
  checkbox?: boolean
  isNumber?: boolean
  currentPage?: number
  pageSize?: number
  isPegawaiPNS?: boolean
}

export function TablePNS<T extends PegawaiPNS, P>({
  data,
  columns,
  containerClasses = '',
  maxHeight = 'max-h-[70vh]',
  loading,
  columnProps,
  onItemClick,
  collapseComponent,
  checkbox,
  isNumber,
  currentPage,
  pageSize,
  isPegawaiPNS,
}: Props<T, P>) {
  const [rowIsOpen, setRowIsOpen] = useState<number | null>(null)
  const dispatch = useDispatch()

  const columnArray =
    typeof columns === 'function' ? columns(columnProps as P) : columns

  return (
    <div className={`h-full rounded-2xl ${containerClasses}`}>
      {/* ----- Loading UI ----- */}
      {loading ? (
        <Loading width="6.4rem" height="6.4rem" />
      ) : (
        <div
          className={`scrollbar flex flex-col overflow-auto ${maxHeight}`}
          style={{ scrollbarGutter: 'stable', borderRadius: '3rem' }}
        >
          {/* ----- No Data/Fallback UI ----- */}
          {!data || data.length === 0 ? (
            <p className="text-24 text-typography-disabled">No data.</p>
          ) : (
            <table className="flex-1 border-collapse text-24">
              <thead className="relative z-10 align-top leading-medium">
                <tr className="border-b-[1.6rem] border-transparent">
                  {/* --- NO --- */}
                  {isNumber && pageSize && currentPage && (
                    <th className="sticky top-0 border-b-2 bg-sim-pale-primary px-24 py-24 text-left uppercase text-sim-primary">
                      #
                    </th>
                  )}

                  {/* ----- Table Headers ----- */}
                  {columnArray
                    .filter((column) => !column.header.includes('Aksi'))
                    .map((column, colIndex) => (
                      <th
                        className={`sticky top-0 border-b-2 bg-sim-pale-primary px-24 py-24 text-left uppercase text-sim-primary ${column.width}`}
                        key={column.key || colIndex.toString()}
                      >
                        {column.header}
                      </th>
                    ))}

                  {/* --- Satuan Kerja --- */}
                  {
                    <th className="sticky top-0 text-nowrap border-b-2 bg-sim-pale-primary px-24 py-24 text-left uppercase text-sim-primary">
                      Satuan Kerja
                    </th>
                  }

                  {/* ----- Detail Header ----- */}
                  {collapseComponent && (
                    <th className="sticky right-0 top-0 bg-white p-16 text-left">
                      <span className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                        Detail
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <Fragment key={rowIndex}>
                    <tr
                      className={clsx(
                        'border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2',
                      )}
                      onClick={onItemClick ? () => onItemClick(row) : undefined}
                    >
                      {/* ----- Nomor ----- */}
                      {isNumber && currentPage && pageSize && (
                        <td className="px-24 py-12 leading-medium">
                          {currentPage * pageSize + (rowIndex + 1 - pageSize)}
                        </td>
                      )}

                      {/* ----- Table Data ----- */}
                      {columnArray
                        .filter((column) => !column.header.includes('Aksi'))
                        .map((column, colIndex) => (
                          <td
                            className={`px-24 py-12 leading-medium ${column.width}`}
                            key={column.key || colIndex.toString()}
                          >
                            {column.renderCell
                              ? column.renderCell(row)
                              : (row[
                                  column.key as keyof T
                                ] as React.ReactNode) || '-'}
                          </td>
                        ))}

                      {
                        <td className={`px-24 py-12 leading-medium`}>
                          <div className="flex items-center justify-between gap-32">
                            <p>{row?.satker}</p>
                            <Link
                              to={`/kepegawaian/${isPegawaiPNS ? 'pns' : 'pppk'}/${convertToSlug(row?.nama)}`}
                              onClick={() => {
                                localStorage.setItem(
                                  'pegawaiID',
                                  row?.id_pegawai,
                                )
                                localStorage.setItem('utama', row?.id_pegawai)
                                localStorage.setItem(
                                  'Golongan & Pangkat',
                                  row?.id_pegawai,
                                )
                                dispatch(
                                  setStateDetailPegawai({ tab: 'utama' }),
                                )
                                dispatch(
                                  setStateDetailRiwayat({
                                    tab: 'Golongan & Pangkat',
                                  }),
                                )
                              }}
                              className="rounded-2xl bg-sim-primary p-8 text-white"
                            >
                              <ChevronRight size={16} />
                            </Link>
                          </div>
                        </td>
                      }
                      {/* ----- Collapse Trigger ----- */}
                      {collapseComponent && (
                        <td className="sticky right-0 bg-white p-16">
                          <div className="shadow-[-2.4rem_0_0.4rem_rgb(255,255,255)]">
                            <button
                              className="rounded-full p-4 transition-all ease-in hover:bg-neutral-100"
                              onClick={() => {
                                if (rowIsOpen === rowIndex) {
                                  setRowIsOpen(null)
                                } else {
                                  setRowIsOpen(rowIndex)
                                }
                              }}
                            >
                              <ChevronDown
                                width={20}
                                height={20}
                                className={clsx('transition-all ease-in', {
                                  'rotate-180': rowIsOpen === rowIndex,
                                  'rotate-0': rowIsOpen !== rowIndex,
                                })}
                              />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>

                    {/* ----- Collapse Content ----- */}
                    {collapseComponent && (
                      <tr>
                        <td colSpan={columnArray.length + (checkbox ? 2 : 1)}>
                          <div
                            className={clsx(
                              'overflow-hidden border-b bg-neutral-100 bg-opacity-[0.15] px-8 transition-all ease-in',
                              {
                                'max-h-full translate-y-0 py-16 opacity-100':
                                  rowIsOpen === rowIndex,
                                'max-h-0 -translate-y-16 opacity-0':
                                  rowIsOpen !== rowIndex,
                              },
                            )}
                          >
                            {collapseComponent}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

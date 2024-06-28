import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Loading } from './Loading'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

type Props<T, P> = {
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
}

export function TableReferensi<T, P>({
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
}: Props<T, P>) {
  const [rowIsOpen, setRowIsOpen] = useState<number | null>(null)

  const columnArray =
    typeof columns === 'function' ? columns(columnProps as P) : columns

  return (
    <div className={`h-full ${containerClasses}`}>
      {/* ----- Loading UI ----- */}
      {loading ? (
        <Loading width="6.4rem" height="6.4rem" />
      ) : (
        <div
          className={`scrollbar flex flex-col overflow-auto ${maxHeight}`}
          style={{
            scrollbarGutter: 'stable',
            borderRadius: '2rem',
            border: '1px solid #f0f0f0',
          }}
        >
          {/* ----- No Data/Fallback UI ----- */}
          {!data || data.length === 0 ? (
            <p className="text-24 text-typography-disabled">No data.</p>
          ) : (
            <table className="flex-1 border-collapse bg-[#fcfcfc] text-24">
              <thead className="relative z-10 align-top leading-medium">
                <tr>
                  {/* --- NO --- */}
                  {isNumber && pageSize && currentPage && (
                    <th className="sticky top-0 w-[10%] border bg-sim-pale-primary px-24 py-16 text-left align-middle text-[2rem] text-sim-dark">
                      No
                    </th>
                  )}

                  {/* ----- Table Headers ----- */}
                  {columnArray
                    .filter((column) => !column.header.includes('Aksi'))
                    .map((column, colIndex) => (
                      <th
                        className={`sticky top-0 w-[20%] border bg-sim-pale-primary px-24 py-16 text-left align-middle text-[2rem] text-sim-dark ${column.width}`}
                        key={column.key || colIndex.toString()}
                      >
                        {column.header}
                      </th>
                    ))}

                  {/* ----- Detail Header ----- */}
                  {collapseComponent && (
                    <th className="sticky top-0 w-[20%] border bg-sim-pale-primary px-24 py-16 text-left align-middle text-sim-dark">
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
                        'transition-all ease-in hover:cursor-pointer',
                      )}
                      onClick={onItemClick ? () => onItemClick(row) : undefined}
                    >
                      {/* ----- Nomor ----- */}
                      {isNumber && currentPage && pageSize && (
                        <td className="border px-24 py-12 align-middle text-[2rem] leading-medium text-sim-dark">
                          {currentPage * pageSize + (rowIndex + 1 - pageSize)}
                        </td>
                      )}

                      {/* ----- Table Data ----- */}
                      {columnArray
                        .filter((column) => !column.header.includes('Aksi'))
                        .map((column, colIndex) => (
                          <td
                            className={`border px-24 py-12 align-middle text-[2rem] leading-medium text-sim-dark ${column.width}`}
                            key={column.key || colIndex.toString()}
                          >
                            {column.renderCell
                              ? column.renderCell(row)
                              : (row[
                                  column.key as keyof T
                                ] as React.ReactNode) || '-'}
                          </td>
                        ))}

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

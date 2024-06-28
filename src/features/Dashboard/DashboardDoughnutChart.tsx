import { ChartDoughnut } from '@/components/ChartComponent'
import { getColor } from '@/libs/helpers/format-color'
import { ChartType } from '@/libs/type'

export function DashboardDoughnutChart({
  data,
  title,
  className,
}: {
  data: ChartType[]
  title: string
  className?: string
}) {
  return (
    <div
      className={`flex ${className ?? 'w-2/5'} gap-64 rounded-2x bg-white p-32`}
    >
      <ChartDoughnut jsonData={data} />
      <div className="flex flex-1 flex-col gap-12">
        <p className="font-bold text-sim-grey">{title}</p>
        <div className="flex gap-64">
          {data?.length === 0 && <p>Belum Ada Data</p>}
          <div className="flex flex-col gap-4">
            {data?.slice(0, 4)?.map((item, idx) => (
              <div
                className={`flex items-center gap-12`}
                key={idx}
                style={{
                  lineHeight: '130%',
                }}
              >
                <div
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: getColor(idx) }}
                />

                <p className="line-clamp-1 text-sim-dark">
                  {item?.nama}: {item?.jlh}
                </p>
              </div>
            ))}
          </div>
          {data?.length > 4 && (
            <div className="flex flex-col gap-4">
              {data?.slice(4, 8)?.map((item, idx) => (
                <div
                  className={`flex items-center gap-12`}
                  key={idx}
                  style={{
                    lineHeight: '130%',
                  }}
                >
                  {data?.length > 8 && idx === 3 ? (
                    <p>...</p>
                  ) : (
                    <>
                      <div
                        className="h-8 w-8 rounded-full"
                        style={{ backgroundColor: getColor(idx + 4) }}
                      />
                      <p className="line-clamp-1 text-sim-dark">
                        {item?.nama}: {item?.jlh}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

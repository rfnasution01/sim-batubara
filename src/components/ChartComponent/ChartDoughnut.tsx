import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ChartType } from '@/libs/type'

ChartJS.register(ArcElement, Tooltip, Legend)

export function ChartDoughnut({ jsonData }: { jsonData: ChartType[] }) {
  const data = {
    labels: jsonData?.map((item) => item.nama), // Ambil nama_kategori sebagai label
    datasets: [
      {
        data: jsonData?.map((item) => item.jlh), // Ambil jumlah_soal sebagai data
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(255, 0, 0)',
          'rgb(0, 255, 0)',
          'rgb(0, 0, 255)',
          'rgb(255, 255, 0)',
          'rgb(255, 0, 255)',
          'rgb(0, 255, 255)',
          'rgb(128, 0, 128)',
          'rgb(128, 128, 0)',
          'rgb(0, 128, 128)',
        ],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className="w-[20%] phones:w-full">
      <Doughnut
        data={data}
        options={{ plugins: { legend: { display: false } } }}
      />
    </div>
  )
}

import { IconFlower } from '@/assets'
import { greetings } from '@/libs/helpers/greatings'

export function DashboardHeader() {
  return (
    <div className="flex gap-32 rounded-2x bg-white p-32 text-sim-dark">
      <div className="flex flex-col gap-8">
        <p className="text-sim-grey">Halo, {greetings()}&#128075;</p>
        <p className="text-[2.8rem] font-bold">System Administrator</p>
      </div>
      <div className="flex flex-1 items-center border-l border-sim-pale-grey px-32">
        <button
          type="submit"
          className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white"
        >
          Terapkan <IconFlower />
        </button>
      </div>
    </div>
  )
}

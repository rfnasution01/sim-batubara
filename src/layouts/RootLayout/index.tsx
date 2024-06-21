import { Outlet } from 'react-router-dom'
import { LayoutNavigation } from './layout-navigation'

export default function RootLayoutMain() {
  return (
    <div className="flex h-screen bg-sim-bg text-[2rem] phones:text-[2.4rem]">
      {/* --- Navigation --- */}
      <LayoutNavigation />
      {/* --- Contentn --- */}
      <div
        className="m-32 flex-1 bg-white px-32 pb-32 pt-48"
        style={{ borderRadius: '4rem' }}
      >
        <Outlet />
      </div>
    </div>
  )
}

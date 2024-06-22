import { Outlet } from 'react-router-dom'
import { LayoutNavigation } from './layout-navigation'

export default function RootLayoutMain() {
  return (
    <div className="scrollbar flex h-screen overflow-y-auto bg-sim-bg text-[2rem] phones:text-[2.4rem]">
      {/* --- Navigation --- */}
      <LayoutNavigation />
      {/* --- Contentn --- */}
      <div
        className="m-32 flex-1 overflow-y-auto"
        // style={{ height: 'calc(100vh - 62px)' }}
      >
        <Outlet />
      </div>
    </div>
  )
}

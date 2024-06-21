import { LayoutNavigation } from './layout-navigation'

export default function RootLayoutMain() {
  return (
    <div className="bg-sim-bg flex h-screen text-[2rem] phones:text-[2.4rem]">
      {/* --- Navigation --- */}
      <LayoutNavigation />
      {/* --- Contentn --- */}
      <div
        className="m-32 flex-1 bg-white p-32"
        style={{ borderRadius: '4rem' }}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio quasi
        reiciendis sequi sunt architecto incidunt nam fuga, possimus quo ea
        debitis neque qui, vel autem! Adipisci animi nostrum quasi magnam.
      </div>
    </div>
  )
}

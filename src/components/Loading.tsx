import ReactLoading, { LoadingProps } from 'react-loading'

export const Loading = ({
  width = '2rem',
  height = '2rem',
  color = '#400053',
}: LoadingProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <ReactLoading width={width} height={height} color={color} type="spin" />
    </div>
  )
}

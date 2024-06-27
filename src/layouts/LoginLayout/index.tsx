import Bg from '@/assets/ImgBackgroundLogin.png'
import { LoginInfo } from './LoginInfo'
import { LoginForm } from './LoginForm'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { LoginSchema } from '@/libs/schema'
import { useForm } from 'react-hook-form'
import { useCreateLoginMutation } from '@/store/slices/loginAPI'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginParams } from '@/libs/type/LoginType'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'

export default function LoginLayoutMain() {
  const navigate = useNavigate()
  const [angka1, setAngka1] = useState<number>(null)
  const [angka2, setAngka2] = useState<number>(null)

  // Fungsi untuk menghasilkan dua angka acak antara 1 dan 10
  const generateRandomNumbers = () => {
    const random1 = Math.floor(Math.random() * 10) + 1 // Menghasilkan angka acak antara 1 dan 10
    const random2 = Math.floor(Math.random() * 10) + 1
    setAngka1(random1)
    setAngka2(random2)
  }

  useEffect(() => {
    generateRandomNumbers()
  }, [])

  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  })

  // --- Create Login ---
  const [
    createLogin,
    {
      isError: isErrorLogin,
      error: errorLogin,
      isLoading: isLoadingLogin,
      isSuccess: isSuccessLogin,
    },
  ] = useCreateLoginMutation()

  const handleSubmit = async (values: LoginParams) => {
    const body = {
      username: values?.username,
      password: values?.password,
      hasil: values?.hasil,
    }

    if (Number(values?.hasil) === angka1 + angka2) {
      try {
        const res = await createLogin({ data: body })
        if ('data' in res) {
          const token = res?.data?.data?.token
          Cookies.set('token', token)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      toast.error(`Jawaban salah!`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }

  useEffect(() => {
    if (isSuccessLogin) {
      toast.success('Login berhasil', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setTimeout(() => {
        navigate(`/kepegawaian/pns`)
      }, 3000)
    }
  }, [isSuccessLogin])

  useEffect(() => {
    if (isErrorLogin) {
      const errorMsg = errorLogin as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorLogin, errorLogin])

  return (
    <div
      className="h-screen text-[2rem] text-sim-dark"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="flex h-full w-full items-center justify-center bg-blue-300 bg-opacity-40">
        <div className="h-auto w-3/4  rounded-3x bg-white p-80 shadow-lg">
          <div className="flex w-full gap-32">
            <LoginInfo />
            {angka1 && angka2 ? (
              <LoginForm
                angka1={angka1}
                angka2={angka2}
                form={form}
                isLoading={isLoadingLogin}
                handleSubmit={handleSubmit}
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

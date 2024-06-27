import { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/Form'
import { FormLabelInput } from '@/components/InputComponent'
import { DoorOpen, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { LoginParams } from '@/libs/type/LoginType'

export function LoginForm({
  form,
  handleSubmit,
  isLoading,
  angka1,
  angka2,
}: {
  form: UseFormReturn
  handleSubmit: (values: LoginParams) => Promise<void>
  isLoading: boolean
  angka1: number
  angka2: number
}) {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <Form {...form}>
      <form
        className="flex w-2/5 flex-col gap-32 rounded-2x border bg-white p-48 shadow"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormLabelInput
          name="username"
          form={form}
          label="Username / NIP"
          placeholder="Masukkan username atau nip"
          className="text-sim-dark"
          type="text"
          isDisabled={isLoading}
        />
        <FormLabelInput
          name="password"
          form={form}
          label="Password"
          placeholder="Masukkan password"
          className="text-sim-dark"
          isDisabled={isLoading}
          suffix={
            <span
              onClick={() => {
                setIsShow(!isShow)
              }}
            >
              {isShow ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
          }
          type={isShow ? 'text' : 'password'}
        />
        <FormLabelInput
          name="hasil"
          form={form}
          label={`Hasil dari ${angka1} + ${angka2} = ?`}
          placeholder="Masukkan hasil penjumlahan"
          className="text-sim-dark"
          type="text"
          isNumber
          isDisabled={isLoading}
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-12 rounded-2xl bg-sim-primary py-16 text-white hover:bg-opacity-90"
        >
          Login
          {isLoading ? (
            <span className="animate-spin duration-300">
              <Loader2 size={16} />
            </span>
          ) : (
            <DoorOpen size={16} />
          )}
        </button>
      </form>
    </Form>
  )
}

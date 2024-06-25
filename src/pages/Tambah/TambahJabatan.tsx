/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { TambahSchema } from '@/libs/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { DataKepegawaianUtamaHeaderType } from '@/libs/type'
import { FormLabelInput, Input } from '@/components/InputComponent'
import { Check, Loader2, Save, Upload } from 'lucide-react'
import {
  SelectListJenisJabatan,
  SelectListSatuanKerjaJabatan,
} from '@/components/SelectComponent'
import {
  useCreateSavaJabatanMutation,
  useGetKepegawaianPNSUtamaQuery,
} from '@/store/slices/kepegawaianAPI'
import { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import clsx from 'clsx'
import { ProfilPegawai } from '@/features/DetailPegawai'
import Cookies from 'js-cookie'
import { Loading } from '@/components/Loading'
import { ModalShowKonfirmasiJabatan } from '@/components/ModalComponent'
import { usePathname } from '@/libs/hooks/usePathname'

export default function TambahPage() {
  const navigate = useNavigate()
  const idParams = localStorage.getItem('pegawaiID')
  const { thirdPathname } = usePathname()
  const [file, setFile] = useState<File>()
  const [fileSK, setFileSK] = useState<File>()
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahSchema>>({
    resolver: zodResolver(TambahSchema),
    defaultValues: {},
  })

  // --- Data Utama ---
  const [kepegawaianUtamaHeader, setKepegawaianUtamaHeader] =
    useState<DataKepegawaianUtamaHeaderType>()

  const {
    data: kepegawaianUtamaData,
    isLoading: kepegawaianUtamaIsLoading,
    isFetching: kepegawaianUtamaIsFetching,
    error,
  } = useGetKepegawaianPNSUtamaQuery(
    {
      id_pegawai: idParams,
    },
    { skip: !idParams },
  )

  const isLoadingKepegawaianUtama =
    kepegawaianUtamaIsLoading || kepegawaianUtamaIsFetching

  useEffect(() => {
    if (kepegawaianUtamaData) {
      setKepegawaianUtamaHeader(kepegawaianUtamaData?.header)
    }
    const errorMsg = error as {
      data?: {
        message?: string
      }
    }

    if (
      errorMsg?.data?.message === 'Token Expired' ||
      errorMsg?.data?.message === 'Token Tidak Sesuai'
    ) {
      Cookies.remove('token')
      navigate('/login')
    }
  }, [kepegawaianUtamaData, idParams, error])

  const [
    createSaveJabatan,
    {
      isError: isErrorSaveJabatan,
      error: errorSaveJabatan,
      isLoading: isLoadingSaveJabatan,
      isSuccess: isSuccessSaveJabatan,
    },
  ] = useCreateSavaJabatanMutation()

  const handleSubmitJabatan = async () => {
    const values = form.getValues()

    const formData = new FormData()

    formData.append('id_pegawai', idParams)
    formData.append('id_jenis_jabatan', values?.jenisJabatan ?? '')
    formData.append('id_jabatan', values?.namaUnor ?? '')
    formData.append('tmt_pelantikan', values?.tmtPelantikan ?? '')
    formData.append('tmt_jabatan', values?.tmtJabatan ?? '')
    formData.append('nomor_sk_jabatan', values?.nomorSk ?? '')
    formData.append('tanggal_sk_jabatan', values?.tanggalSk ?? '')

    if (file) {
      formData.append('dokumen', file)
    }

    if (fileSK) {
      formData.append('dokumensk', fileSK)
    }

    console.log(...formData.entries())

    try {
      const res = await createSaveJabatan({
        data: formData,
      })

      localStorage.setItem('jabatanID', res?.data?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessSaveJabatan) {
      toast.success('Data berhasil di simpan', {
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
        navigate(`/kepegawaian/pns/${thirdPathname}/jabatan/detail`)
      }, 3000)
    }
  }, [isSuccessSaveJabatan])

  useEffect(() => {
    if (isErrorSaveJabatan) {
      const errorMsg = errorSaveJabatan as { data?: { message?: string } }

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
  }, [isErrorSaveJabatan, errorSaveJabatan])

  return (
    <div className="flex flex-col gap-32">
      {isLoadingKepegawaianUtama ? (
        <Loading height={'6rem'} width={'6rem'} />
      ) : (
        <ProfilPegawai data={kepegawaianUtamaHeader} />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitJabatan)}
          className="flex flex-col gap-32 rounded-3x bg-white p-32"
        >
          <p className="text-[2.8rem] font-bold">Tambah Data Riwayat Jabatan</p>
          <div className="flex flex-col gap-32 rounded-3x border bg-white p-32">
            <SelectListJenisJabatan
              useFormReturn={form}
              name="jenisJabatan"
              headerLabel="Jenis Jabatan"
              placeholder="Pilih Jenis Jabatan"
              className="w-1/2 phones:w-full"
              isDisabled={isLoadingSaveJabatan}
            />
            <hr className="w-full border" />

            <SelectListSatuanKerjaJabatan
              useFormReturn={form}
              name="namaUnor"
              headerLabel="Unit Organisasi"
              placeholder="Pilih Satuan Kerja"
              className="w-1/2 phones:w-full"
              isDisabled={isLoadingSaveJabatan}
            />

            <div className="flex items-center gap-32">
              <FormLabelInput
                name="nomorSk"
                form={form}
                label="Nomor SK"
                placeholder="Masukkan Nomor SK"
                className="text-sim-dark"
                type="text"
                isDisabled={isLoadingSaveJabatan}
              />
              <FormLabelInput
                name="tanggalSk"
                form={form}
                label="Tanggal SK"
                placeholder="Masukkan Tanggal SK"
                className="text-sim-dark"
                type="date"
                isDisabled={isLoadingSaveJabatan}
              />
            </div>

            <hr className="w-full border" />

            <div className="flex items-center gap-32">
              <FormLabelInput
                name="tmtJabatan"
                form={form}
                label="TMT Jabatan"
                placeholder="Masukkan TMT Jabatan"
                className="text-sim-dark"
                type="date"
                isDisabled={isLoadingSaveJabatan}
              />

              <FormLabelInput
                name="tmtPelantikan"
                form={form}
                label="TMT Pelantikan"
                placeholder="Masukkan TMT Pelantikan"
                className="text-sim-dark"
                type="date"
                isDisabled={isLoadingSaveJabatan}
              />
            </div>

            <div className="flex gap-32">
              <FormField
                name="dokumen"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex flex-col gap-8">
                        <p>
                          Dokumen SK Jabatan (
                          <span className="text-[1.6rem] text-danger">
                            *PDF
                          </span>
                          )
                        </p>
                        <Input
                          className="absolute w-full overflow-hidden opacity-0"
                          {...field}
                          id="berkas"
                          type="file"
                          value={''}
                          accept=".pdf"
                          disabled={isLoadingSaveJabatan}
                          placeholder="Lampiran"
                          onChange={(e) => {
                            if (e.target.files[0] != null) {
                              setFile(e.target.files[0])
                            }
                          }}
                        />
                        <div
                          className={clsx(
                            'flex w-full gap-12 phones:flex-col',
                            {
                              'items-center': !file?.name,
                            },
                          )}
                        >
                          <div className="">
                            <label
                              className={clsx(
                                'flex items-center gap-12 rounded-2xl border px-16 py-8 hover:cursor-pointer phones:w-full',
                                {
                                  'bg-sim-dark text-white': file?.name,
                                  'border-sim-dark text-sim-dark ': !file?.name,
                                },
                              )}
                              htmlFor="berkas"
                            >
                              <span>
                                <Upload size={12} />
                              </span>
                              Upload
                            </label>
                          </div>
                          {file?.name ? (
                            <p>{file?.name}</p>
                          ) : (
                            <p className="text-sim-pale-grey">Belum ada file</p>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="dokumensk"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex flex-col gap-8">
                        <p>
                          Dokumen SK Pelantikan (
                          <span className="text-[1.6rem] text-danger">
                            *PDF
                          </span>
                          )
                        </p>
                        <Input
                          className="absolute w-full overflow-hidden opacity-0"
                          {...field}
                          id="berkassk"
                          type="file"
                          value={''}
                          accept=".pdf"
                          disabled={isLoadingSaveJabatan}
                          placeholder="Lampiran"
                          onChange={(e) => {
                            if (e.target.files[0] != null) {
                              setFileSK(e.target.files[0])
                            }
                          }}
                        />
                        <div
                          className={clsx(
                            'flex w-full gap-12 phones:flex-col',
                            {
                              'items-center': !fileSK?.name,
                            },
                          )}
                        >
                          <div className="">
                            <label
                              className={clsx(
                                'flex items-center gap-12 rounded-2xl border px-16 py-8 hover:cursor-pointer phones:w-full',
                                {
                                  'bg-sim-dark text-white': fileSK?.name,
                                  'border-sim-dark text-sim-dark ':
                                    !fileSK?.name,
                                },
                              )}
                              htmlFor="berkassk"
                            >
                              <span>
                                <Upload size={12} />
                              </span>
                              Upload
                            </label>
                          </div>
                          {fileSK?.name ? (
                            <p>{fileSK?.name}</p>
                          ) : (
                            <p className="text-sim-pale-grey">Belum ada file</p>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setIsShow(true)
              }}
              className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              Simpan
            </button>
          </div>
          <ModalShowKonfirmasiJabatan
            isOpen={isShow}
            setIsOpen={setIsShow}
            children={
              <button
                type="submit"
                onClick={handleSubmitJabatan}
                disabled={isLoadingSaveJabatan}
                className="flex items-center gap-12 rounded-2xl bg-sim-primary px-24 py-12 text-white hover:bg-opacity-80 disabled:cursor-not-allowed"
              >
                {isLoadingSaveJabatan ? (
                  <div className="animate-spin duration-300">
                    <Loader2 size={16} />
                  </div>
                ) : (
                  <Check size={16} />
                )}
                Sudah Benar
              </button>
            }
            form={form}
            file={file?.name}
            fileSk={fileSK?.name}
          />
        </form>
      </Form>
      <ToastContainer />
    </div>
  )
}

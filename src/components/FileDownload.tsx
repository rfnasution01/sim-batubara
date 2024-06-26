import axios from 'axios'
import Cookies from 'js-cookie'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'

export default function FileDownload({
  uri,
  namaFile,
}: {
  uri: string
  namaFile: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const downloadFile = async () => {
    setIsLoading(true)

    try {
      const baseURL = import.meta.env.VITE_BASE_URL
      const token = Cookies.get('token')
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const response = await axios.get(
        `${baseURL}/kepegawaian/dokumen1_download?dok_uri=${uri}`, // Ganti dengan URL sesuai kebutuhan
        {
          responseType: 'blob', // Respons yang diharapkan dalam bentuk blob
          headers: headers, // Menambahkan header Authorization
        },
      )

      // Membuat objek URL dari blob
      const url = window.URL.createObjectURL(new Blob([response.data]))

      // Membuat elemen <a> untuk men-trigger download
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.pdf') // Nama file yang akan didownload
      document.body.appendChild(link)
      link.click()

      // Menghapus objek URL setelah download selesai
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
      // Menangani error dengan baik sesuai kebutuhan aplikasi Anda
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button onClick={downloadFile} className="flex items-center gap-12">
      {namaFile}{' '}
      {isLoading && (
        <span className="animate-spin duration-300">
          <RefreshCcw size={16} />
        </span>
      )}
    </button>
  )
}

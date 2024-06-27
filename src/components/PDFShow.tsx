const PDFViewer = ({
  dok_nama,
  dok_id,
  id,
  riwayat,
}: {
  dok_nama: string
  dok_id: string
  riwayat: string
  id: string
}) => {
  const downloadURL = `${import.meta.env.VITE_BASE_DOWNLOAD}${riwayat}`

  const handleClick = () => {
    const newWindow = window.open()
    newWindow.document.write(`
      <html>
        <head>
          <title>${dok_nama}</title>
          <style>
            .loading {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              font-size: 20px;
              font-weight: bold;
            }
            .pdf-iframe {
              display: none;
              border: none;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body style="margin:0;">
          <div class="loading">Loading...</div>
          <iframe
            class="pdf-iframe"
            src="${downloadURL}/${id}/${dok_id}"
            onload="this.previousElementSibling.style.display='none'; this.style.display='block';"
          ></iframe>
        </body>
      </html>
    `)
  }

  return (
    <div
      className="rounded-2xl bg-sim-dark px-16 py-8 text-white hover:bg-opacity-80"
      onClick={handleClick}
    >
      {dok_nama}
    </div>
  )
}

export default PDFViewer

const PDFViewer = ({ pdfData }) => {
  const pdfURL = `${pdfData}`

  return (
    <div className="w-full">
      <object data={pdfURL} type="application/pdf" width="100%" height="500">
        <p>Maaf, browser Anda tidak dapat menampilkan dokumen PDF.</p>
      </object>
    </div>
  )
}

export default PDFViewer

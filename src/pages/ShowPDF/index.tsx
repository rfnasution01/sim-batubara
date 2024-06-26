export default function ShowPDF() {
  const pdfUrl =
    'kepegawaian/pns/iswan/peremajaan/usulan/A8ACA7F2236B3912E040640A040269BB_20240625_222902_f7085202-761e-4c97-b277-1338adc7d82f.pdf'

  return (
    <div className="h-full w-full">
      <iframe
        src={`${process.env.REACT_APP_BASE_URL}/${pdfUrl}`}
        title="PDF Viewer"
        className="h-full w-full"
      />
    </div>
  )
}

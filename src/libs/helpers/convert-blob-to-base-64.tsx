export function blobToUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to read Blob as URL'))
      }
    }
    reader.readAsDataURL(blob)
  })
}

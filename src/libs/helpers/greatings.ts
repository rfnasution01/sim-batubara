import dayjs from 'dayjs'
import 'dayjs/locale/id' // Mengimpor bahasa Indonesia jika diperlukan

export const greetings = () => {
  const now = dayjs()
  const hour = now.hour()

  let greetingMessage = ''

  if (hour >= 5 && hour < 12) {
    greetingMessage = 'Selamat pagi!'
  } else if (hour >= 12 && hour < 18) {
    greetingMessage = 'Selamat siang!'
  } else if (hour >= 18 && hour < 24) {
    greetingMessage = 'Selamat malam!'
  } else {
    greetingMessage = 'Selamat dini hari!'
  }

  return greetingMessage
}

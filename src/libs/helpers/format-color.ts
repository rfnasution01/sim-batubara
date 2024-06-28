export const getColor = (idx) => {
  switch (idx % 14) {
    case 0:
      return 'rgb(255, 99, 132)'
    case 1:
      return 'rgb(54, 162, 235)'
    case 2:
      return 'rgb(255, 205, 86)'
    case 3:
      return 'rgb(75, 192, 192)'
    case 4:
      return 'rgb(153, 102, 255)'
    case 5:
      return 'rgb(255, 159, 64)'
    case 6:
      return 'rgb(255, 0, 0)'
    case 7:
      return 'rgb(0, 255, 0)'
    case 8:
      return 'rgb(0, 0, 255)'
    case 9:
      return 'rgb(255, 255, 0)'
    case 10:
      return 'rgb(255, 0, 255)'
    case 11:
      return 'rgb(0, 255, 255)'
    case 12:
      return 'rgb(128, 0, 128)'
    case 13:
      return 'rgb(128, 128, 0)'
    default:
      return 'rgb(0, 128, 128)'
  }
}

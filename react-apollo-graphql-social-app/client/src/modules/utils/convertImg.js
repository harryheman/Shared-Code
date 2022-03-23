// Утилита для преобразования изображения в строку в формате base64

export const convertImg = (img) => {
  const reader = new FileReader()

  return new Promise((res) => {
    reader.onload = () => {
      res(reader.result)
    }
    reader.readAsDataURL(img)
  })
}

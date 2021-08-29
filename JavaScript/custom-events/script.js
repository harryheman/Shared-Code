const section = document.querySelector('.form section')

section.addEventListener('dragover', handleDragOver)
section.addEventListener('dragenter', handleDragEnter)
section.addEventListener('drop', handleDrop)

function handleDragOver(e) {
  e.preventDefault()
  if (!e.dataTransfer.types.includes('Files')) return
  e.dataTransfer.dropEffect = 'copy'
}

function handleDragEnter(e) {
  e.preventDefault()
  if (!e.dataTransfer.types.includes('Files')) return
}

function handleDrop(e) {
  e.preventDefault()
  const file = e.dataTransfer.files[0]
  if (!file.type.startsWith('image')) return
  handleFileUpload(file)
}

function handleFileUpload(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('load', (e) => {
    dispatchCardEvent({
      img: e.target.result
    })
  })
  fileReader.readAsDataURL(file)
}

const profileCard = document.querySelector('.profile-card')
const imgField = profileCard.querySelector('img')
const nameField = profileCard.querySelector('span.name')
const occupationField = profileCard.querySelector('span.occupation')

const EVENT_NAME = 'card_update'

function dispatchCardEvent(data) {
  profileCard.dispatchEvent(
    new CustomEvent(EVENT_NAME, {
      detail: data
    })
  )
}

profileCard.addEventListener(EVENT_NAME, handleCardUpdate)

function handleCardUpdate(e) {
  const { img, name, occupation } = e.detail
  if (img) imgField.src = img
  if (name) nameField.textContent = name
  if (occupation) occupationField.textContent = occupation
}

const form = document.querySelector('form')

form.addEventListener('change', ({ target: { id, value, files } }) => {
  switch (id) {
    case 'file-input':
      handleFileUpload(files[0])
      break
    case 'name-input':
      dispatchCardEvent({
        name: value
      })
      break
    case 'occupation-input':
      dispatchCardEvent({
        occupation: value
      })
      break
    default:
      break
  }
})

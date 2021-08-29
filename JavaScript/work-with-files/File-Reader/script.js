;((D, B, log = (arg) => console.log(arg)) => {
  const dropZone = D.querySelector('div')
  const input = D.querySelector('input')
  let file

  D.addEventListener('dragover', (ev) => ev.preventDefault())
  D.addEventListener('drop', (ev) => ev.preventDefault())

  dropZone.addEventListener('drop', (ev) => {
    ev.preventDefault()

    log(ev.dataTransfer)

    file = ev.dataTransfer.files[0]

    log(file)

    handleFile(file)
  })

  dropZone.addEventListener('click', () => {
    input.click()
    input.addEventListener('change', () => {
      log(input.files)

      file = input.files[0]

      log(file)

      handleFile(file)
    })
  })

  const handleFile = (file) => {
    dropZone.remove()
    input.remove()

    log(file.type)

    if (
      file.type === 'text/html' ||
      file.type === 'text/css' ||
      file.type === 'text/javascript'
    )
      return

    if (file.type === 'application/pdf') {
      createIframe(file)
      return
    }

    const type = file.type.replace(/\/.+/, '')

    log(type)

    switch (type) {
      case 'image':
        createImage(file)
        break
      case 'audio':
        createAudio(file)
        break
      case 'video':
        createVideo(file)
        break
      case 'text':
        createText(file)
        break

      default:
        B.innerHTML = `<h3>Unknown File Format!</h3>`
        const timer = setTimeout(() => {
          location.reload()
          clearTimeout(timer)
        }, 2000)
        break
    }
  }

  const createImage = (image) => {
    const imageEl = D.createElement('img')
    imageEl.src = URL.createObjectURL(image)
    log(imageEl)
    B.append(imageEl)
    URL.revokeObjectURL(image)
  }

  const createAudio = (audio) => {
    const audioEl = D.createElement('audio')
    audioEl.setAttribute('controls', '')
    audioEl.src = URL.createObjectURL(audio)
    log(audioEl)
    B.append(audioEl)
    audioEl.play()
    URL.revokeObjectURL(audio)
  }

  const createVideo = (video) => {
    const videoEl = D.createElement('video')
    videoEl.setAttribute('controls', '')
    videoEl.setAttribute('loop', 'true')
    videoEl.src = URL.createObjectURL(video)
    log(videoEl)
    B.append(videoEl)
    videoEl.play()
    URL.revokeObjectURL(video)
  }

  const createText = (text) => {
    const reader = new FileReader()
    reader.readAsText(text, 'windows-1251')
    reader.onload = () => (B.innerHTML = `<p><pre>${reader.result}</pre></p>`)
  }

  const createIframe = (pdf) => {
    const iframe = D.createElement('iframe')
    iframe.src = URL.createObjectURL(pdf)
    iframe.width = innerWidth
    iframe.height = innerHeight
    log(iframe)
    B.append(iframe)
    URL.revokeObjectURL(pdf)
  }
})(document, document.body)

let dropZone = document.querySelector('div'),
  input = document.querySelector('input'),
  file,
  text,
  progress,
  volume,
  audio,
  frequencyArray

dropZone.ondrop = (e) => {
  e.preventDefault()

  if (e.dataTransfer.items[0].kind == 'file') {
    file = e.dataTransfer.items[0].getAsFile()
  } else return

  playTrack(file)
}

dropZone.ondragover = (e) => {
  e.preventDefault()
}

dropZone.onclick = () => {
  input.click()
  input.onchange = () => {
    file = input.files[0]

    playTrack(file)
  }
}

let C = document.querySelector('canvas'),
  $ = C.getContext('2d'),
  W = (C.width = innerWidth),
  H = (C.height = innerHeight),
  centerX = W / 2,
  centerY = H / 2,
  radius,
  piece,
  bars = 200,
  x,
  y,
  xEnd,
  yEnd,
  barWidth = 2,
  barHeight,
  lineColor

function playTrack(file) {
  dropZone.style.display = 'none'

  text = document.querySelector('p')

  text.style.transform = 'translate(-50%,-50%)'

  text.innerHTML = `progress: <span class="progress"></span> <br> volume: <span class="volume"></span>`

  volume = document.querySelector('.volume')

  progress = document.querySelector('.progress')

  document.addEventListener('keydown', (e) => {
    try {
      if (e.keyCode == 32) {
        audio.paused ? audio.play() : audio.pause()
      } else if (e.keyCode == 13) {
        audio.load()
      } else if (e.keyCode == 39) {
        audio.currentTime += 10
      } else if (e.keyCode == 37) {
        audio.currentTime -= 10
      } else if (e.keyCode == 40) {
        audio.volume -= 0.1
      } else if (e.keyCode == 38) {
        audio.volume += 0.1
      }
    } catch {
      return
    }
  })

  console.log(
    'Use Keyboard: \n Space to Play/Pause \n Enter to Stop \n Arrows to Change \n Time and Volume'
  )

  audio = new Audio()
  context = new AudioContext()
  analyser = context.createAnalyser()

  audio.src = URL.createObjectURL(file)
  source = context.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(context.destination)

  frequencyArray = new Uint8Array(analyser.frequencyBinCount)

  audio.play()

  audio.loop = true

  startAnimation()

  function startAnimation() {
    C.style.display = 'block'

    piece = audio.currentTime / audio.duration

    radius = 105

    $.clearRect(0, 0, W, H)

    $.beginPath()
    $.arc(centerX, centerY, radius, 0, Math.PI * (2 * piece))
    $.lineWidth = 30
    $.stroke()

    volume.innerText = Math.trunc(audio.volume * 100) + '%'

    progress.innerText = Math.trunc(piece * 100) + '%'
    analyser.getByteFrequencyData(frequencyArray)
    for (let i = 0; i < bars; i++) {
      radius = 120
      rads = (Math.PI * 2) / bars
      barHeight = frequencyArray[i] * 0.6

      x = centerX + Math.cos(rads * i) * radius
      y = centerY + Math.sin(rads * i) * radius
      xEnd = centerX + Math.cos(rads * i) * (radius + barHeight)
      yEnd = centerY + Math.sin(rads * i) * (radius + barHeight)

      drawBar(x, y, xEnd, yEnd, barWidth, frequencyArray[i])
    }
    requestAnimationFrame(startAnimation)
  }

  function drawBar(x1, y1, x2, y2, width, frequency) {
    lineColor = 'rgb(' + frequency + ', ' + frequency + ', ' + 205 + ')'

    $.strokeStyle = lineColor
    $.lineWidth = width
    $.beginPath()
    $.moveTo(x1, y1)
    $.lineTo(x2, y2)
    $.stroke()
  }
}

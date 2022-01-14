import {
  equal,
  canvas,
  ctx,
  canvasWidth,
  canvasHeight,
  uploadButton,
  uploadInput,
  trackList,
  reloadButton,
  trackTitle,
  trackBar,
  trackTime,
  trackDuration,
  volumeBar,
  volumeLevel,
  playButton,
  pauseButton,
  stopButton,
  backwardButton,
  forwardButton,
  nextButton,
  prevButton,
  volumeButton,
  muteButton,
  shuffleButton,
  checkButton,
  fastButton,
  normalButton,
  visualButton,
  equalButton,
  listButton,
  freqInputs,
  popButton,
  rockButton,
  rapButton,
  defaultButton,
  popPreset,
  rockPreset,
  rapPreset
} from './buttons.js'

uploadButton.addEventListener('click', () => {
  uploadInput.click()
})

uploadInput.addEventListener('change', () => {
  const files = uploadInput.files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const name = file.name.replace(/\.\w+/, '')
    const src = URL.createObjectURL(file)

    const template = `
        <figure>
            <figcaption>${name}</figcaption>
            <audio src=${src}></audio>
        </figure>
        `

    trackList.insertAdjacentHTML('beforeend', template)
  }

  trackList.style.display = 'block'
  uploadButton.style.display = 'none'
  reloadButton.style.display = 'block'

  initPlayer()
})

reloadButton.addEventListener('click', () => {
  location.reload()
})

function initPlayer() {
  trackList.querySelector('figure').classList.add('checked')

  let audio

  chooseTrack()

  function chooseTrack() {
    audio = trackList.querySelector('.checked audio')
    audio.load()
    audio.addEventListener('loadedmetadata', setDuration)
    trackTitle.innerText = audio.previousElementSibling.innerText
    playButton.focus()
  }

  const figures = trackList.querySelectorAll('figure')

  figures.forEach((figure) => {
    figure.addEventListener('click', checkFigure)
  })

  function checkFigure(e) {
    const oldFigure = trackList.querySelector('.checked')
    let newFigure

    if (e === '+') {
      newFigure = oldFigure.nextElementSibling
      if (newFigure === null) {
        newFigure = figures[0]
      }
    } else if (e === '-') {
      newFigure = oldFigure.previousElementSibling
      if (newFigure === null) {
        newFigure = figures[figures.length - 1]
      }
    } else if (e === 'r') {
      newFigure = figures[Math.floor(Math.random() * (figures.length - 1))]
    } else {
      newFigure = e.target.parentNode
      if (oldFigure === newFigure) {
        return
      }
    }

    oldFigure.classList.remove('checked')
    newFigure.classList.add('checked')

    changeTime('stop')
    chooseTrack()
    changeTime('play')
  }

  playButton.addEventListener('click', () => {
    changeTime('play')
  })
  pauseButton.addEventListener('click', () => {
    changeTime('pause')
  })
  stopButton.addEventListener('click', () => {
    changeTime('stop')
  })

  backwardButton.addEventListener('click', () => {
    changeTime('-')
  })
  forwardButton.addEventListener('click', () => {
    changeTime('+')
  })

  trackBar.addEventListener('click', changeTime)

  nextButton.addEventListener('click', () =>
    shuffleButton.isChecked ? checkFigure('r') : checkFigure('+')
  )
  prevButton.addEventListener('click', () =>
    shuffleButton.isChecked ? checkFigure('r') : checkFigure('-')
  )

  volumeButton.addEventListener('click', () => {
    changeVolume('on')
  })
  muteButton.addEventListener('click', () => {
    changeVolume('off')
  })
  volumeBar.addEventListener('click', changeVolume)

  shuffleButton.addEventListener('click', () => {
    shuffleButton.isChecked = true
    shuffleButton.style.display = 'none'
    checkButton.style.display = 'block'
    checkButton.focus()
  })
  checkButton.addEventListener('click', () => {
    shuffleButton.isChecked = false

    shuffleButton.style.display = 'block'
    checkButton.style.display = 'none'

    shuffleButton.focus()
  })

  fastButton.addEventListener('click', () => {
    fastButton.isChecked = true

    if (audio.played) {
      audio.playbackRate = 2
    }

    fastButton.style.display = 'none'
    normalButton.style.display = 'block'

    normalButton.focus()
  })
  normalButton.addEventListener('click', () => {
    fastButton.isChecked = false

    if (audio.played) {
      audio.playbackRate = 1
    }

    fastButton.style.display = 'block'
    normalButton.style.display = 'none'

    fastButton.focus()
  })

  canvas.addEventListener('click', () => {
    canvas.isChecked ? (canvas.isChecked = false) : (canvas.isChecked = true)
  })
  canvas.style.display = 'block'

  visualButton.addEventListener('click', () => {
    canvas.style.display === 'block'
      ? (canvas.style.display = 'none')
      : (canvas.style.display = 'block')
  })

  equalButton.addEventListener('click', () => {
    equal.style.display === 'flex'
      ? (equal.style.display = 'none')
      : (equal.style.display = 'flex')
  })

  listButton.addEventListener('click', () => {
    trackList.style.display === 'block'
      ? (trackList.style.display = 'none')
      : (trackList.style.display = 'block')
  })

  document.addEventListener('keydown', (e) => {
    e.preventDefault()
    // left arror
    if (e.keyCode === 37 || e.keyCode === 100) {
      changeTime('-')
      // right arrow
    } else if (e.keyCode === 39 || e.keyCode === 102) {
      changeTime('+')
      // up arrow
    } else if (e.keyCode === 187 || e.keyCode === 107 || e.keyCode === 38) {
      changeVolume('+')
      // down arrow
    } else if (e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 40) {
      changeVolume('-')
      // space
    } else if (e.keyCode === 32) {
      if (audio.paused || audio.ended) {
        changeTime('play')
      } else {
        changeTime('pause')
      }
      // enter
    } else if (e.keyCode === 13) {
      changeTime('stop')
    }
  })

  function setDuration() {
    let minutes = Math.trunc(audio.duration / 60),
      seconds = Math.trunc(audio.duration)
    if (seconds >= 60) {
      seconds = Math.trunc(audio.duration % (60 * minutes))
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    trackDuration.innerText = `${minutes}:${seconds}`

    const max = parseInt(audio.duration * 10)
    trackBar.setAttribute('max', max)
  }

  function changeTime(e) {
    if (e === 'play') {
      audio.play()

      if (fastButton.isChecked) {
        audio.playbackRate = 2
      } else {
        audio.playbackRate = 1
      }

      playButton.style.display = 'none'
      pauseButton.style.display = 'block'

      setDuration()
      startVisual()
    } else if (e === 'pause') {
      audio.pause()

      playButton.style.display = 'block'
      pauseButton.style.display = 'none'
    } else if (e === 'stop') {
      audio.load()

      playButton.style.display = 'block'
      pauseButton.style.display = 'none'
    } else if (e === '+') {
      audio.currentTime += 10
    } else if (e === '-') {
      audio.currentTime -= 10
    } else {
      audio.currentTime = (e.offsetX / this.offsetWidth) * audio.duration
    }

    const timer = setInterval(() => {
      const minutes = Math.trunc(audio.currentTime / 60)
      let seconds = Math.trunc(audio.currentTime)

      if (seconds >= 60) {
        seconds = Math.trunc(audio.currentTime % (60 * minutes))
      }

      if (seconds < 10) {
        seconds = '0' + seconds
      }

      trackTime.innerText = `${minutes}:${seconds}`

      trackBar.value = parseInt(audio.currentTime * 10)

      if (audio.paused || audio.ended) {
        clearInterval(timer)
      }

      if (audio.ended) {
        if (shuffleButton.isChecked) {
          checkFigure('r')
          return
        }
        checkFigure('+')
      }
    }, 100)
  }

  function changeVolume(e) {
    try {
      if (e === 'off') {
        audio.muted = true
        volumeButton.style.display = 'none'
        muteButton.style.display = 'block'
      } else if (e === 'on') {
        audio.muted = false
        volumeButton.style.display = 'block'
        muteButton.style.display = 'none'
      } else if (e === '+') {
        if (audio.muted) {
          changeVolume('on')
        }
        audio.volume += 0.1
      } else if (e === '-') {
        audio.volume -= 0.1
        if (audio.volume < 0.1) {
          changeVolume('off')
        }
      } else {
        if (audio.muted) {
          changeVolume('on')
        }
        audio.volume = (e.offsetX / this.offsetWidth).toFixed(1)
        if (audio.volume === 0) {
          changeVolume('off')
        }
      }
    } catch {
      return
    }

    let value = Math.round(audio.volume * 10) * 10

    if (audio.muted) {
      value = 0
    }

    volumeBar.value = value
    volumeLevel.innerText = value + '%'
  }

  freqInputs.forEach((input) => {
    input.setAttribute('min', -15)
    input.setAttribute('max', 15)
    input.setAttribute('step', 0.1)
    input.setAttribute('value', 0)
    input.setAttribute('type', 'range')
  })

  let audioCtx
  let audioSrc
  let mediaArray = new WeakMap()

  function startVisual() {
    if (audioCtx === undefined) {
      audioCtx = new AudioContext()
    }

    const analyser = audioCtx.createAnalyser()

    if (mediaArray.has(audio)) {
      audioSrc = mediaArray.get(audio)
    } else {
      audioSrc = audioCtx.createMediaElementSource(audio)
      mediaArray.set(audio, audioSrc)
    }

    audioSrc.connect(analyser)
    analyser.connect(audioCtx.destination)
    analyser.fftSize = 256

    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const barWidth = (canvasWidth / 64) * 1.2

    renderFrame()

    function renderFrame() {
      requestAnimationFrame(renderFrame)

      analyser.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      if (canvas.isChecked) {
        ctx.strokeStyle = 'steelblue'
        ctx.beginPath()
        ctx.moveTo(-2, 0)
        for (let i = 0, j = 0; i < 128; i++) {
          if (i % 2 === 0) {
            let barHeight = dataArray[i] / 6.4
            ctx.lineTo(j, canvasHeight - barHeight)
            j += barWidth
          } else {
            continue
          }
        }
        ctx.stroke()
      } else {
        for (let i = 0, j = 0; i < 128; i++) {
          if (i % 2 === 0) {
            let barHeight = dataArray[i] / 6.4
            ctx.lineTo(j, canvasHeight - barHeight)
            let gradient = ctx.createLinearGradient(j, 0, j + barWidth, 0)
            gradient.addColorStop(0.1, '#fff')
            gradient.addColorStop(0.2, 'skyblue')
            gradient.addColorStop(0.8, 'steelblue')
            gradient.addColorStop(0.9, '#fff')
            ctx.fillStyle = gradient
            ctx.fillRect(j, canvasHeight - barHeight, barWidth, barHeight)
            j += barWidth
          } else {
            continue
          }
        }
      }
    }

    let filters = []

    createFilters()

    function createFilters() {
      const frequencies = [
        31,
        87,
        175,
        350,
        700,
        1400,
        2800,
        5600,
        11200,
        16000
      ]

      filters = frequencies.map((frequency) => {
        const filter = audioCtx.createBiquadFilter()
        filter.type = 'peaking'
        filter.frequency.value = frequency
        filter.gain.value = 0
        filter.Q.value = 1
        return filter
      })

      filters.reduce((prev, curr) => {
        prev.connect(curr)
        return curr
      })
    }

    initEvents()

    function initEvents() {
      freqInputs.forEach((i, j) => {
        i.addEventListener('change', (e) => {
          filters[j].gain.value = e.target.value
          equal.querySelector('.frequency-value').innerText =
            filters[j].gain.value.toFixed(1) + 'dB'
        })
      })
    }

    popButton.addEventListener('click', () => setPreset('pop'))
    rockButton.addEventListener('click', () => setPreset('rock'))
    rapButton.addEventListener('click', () => setPreset('rap'))
    defaultButton.addEventListener('click', () => setPreset('default'))

    function setPreset(e) {
      freqInputs.forEach((i, j) => {
        if (e === 'pop') {
          i.value = popPreset[j]
        } else if (e === 'rock') {
          i.value = rockPreset[j]
        } else if (e === 'rap') {
          i.value = rapPreset[j]
        } else if (e === 'default') {
          i.value = 0
        }
        filters[j].gain.value = i.value
        i.nextElementSibling.innerText = i.value + 'dB'
      })
    }

    audioSrc.connect(filters[0])
    filters[9].connect(audioCtx.destination)
  }
}

navigator.serviceWorker.register('./sw.js').catch((err) => {
  console.error(err)
})

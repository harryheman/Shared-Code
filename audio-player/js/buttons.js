const equal = document.querySelector('.equal-box')
const player = document.querySelector('.player-box')
const canvas = player.querySelector('canvas')
const ctx = canvas.getContext('2d')
const canvasWidth = canvas.width
const canvasHeight = canvas.height
const trackList = document.querySelector('.track-list')

const uploadButton = player.querySelector('.upload-button')
const uploadInput = player.querySelector('.upload-input')
const reloadButton = player.querySelector('.reload-button')

const trackTitle = player.querySelector('.track-title')
const trackBar = player.querySelector('.track-bar')
const trackTime = player.querySelector('.track-time')
const trackDuration = player.querySelector('.track-duration')

const volumeBar = player.querySelector('.volume-bar')
const volumeLevel = player.querySelector('.volume-level')

const playButton = player.querySelector('.play-button')
const pauseButton = player.querySelector('.pause-button')
const stopButton = player.querySelector('.stop-button')
const backwardButton = player.querySelector('.backward-button')
const forwardButton = player.querySelector('.forward-button')
const nextButton = player.querySelector('.next-button')
const prevButton = player.querySelector('.prev-button')
const volumeButton = player.querySelector('.volume-button')
const muteButton = player.querySelector('.mute-button')
const shuffleButton = player.querySelector('.shuffle-button')
const checkButton = player.querySelector('.check-button')
const fastButton = player.querySelector('.fast-button')
const normalButton = player.querySelector('.normal-button')
const visualButton = player.querySelector('.visual-button')
const equalButton = player.querySelector('.equal-button')
const listButton = player.querySelector('.list-button')

const freqInputs = equal.querySelectorAll('input')
const popButton = equal.querySelector('.pop-button')
const rockButton = equal.querySelector('.rock-button')
const rapButton = equal.querySelector('.rap-button')
const defaultButton = equal.querySelector('.default-button')

const popPreset = [-1.6, 3.9, 5.5, 2.1, -0.6, -1.5, -2.1, -2.7, -2.1, -0.3]
const rockPreset = [5.4, 3.6, -6.3, -3.6, -0.3, 4.5, 6.9, 7.8, 7.8, 8.1]
const rapPreset = [0, 5.3, 0, -4.5, 0.3, -1.8, -0.6, 4.5, 2.4, 0]

export {
  equal,
  player,
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
}

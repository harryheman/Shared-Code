const game = () => {
  let pScore = 0
  let cScore = 0

  const startGame = () => {
    const playBtn = document.querySelector('.intro button')
    const introScreen = document.querySelector('.intro')
    const matchScreen = document.querySelector('.match')

    playBtn.addEventListener('click', () => {
      introScreen.classList.add('fadeOut')
      matchScreen.classList.add('fadeIn')
    })
  }

  const playMatch = () => {
    const options = document.querySelectorAll('.options button')
    const playerHand = document.querySelector('.player-hand')
    const compHand = document.querySelector('.comp-hand')
    const hands = document.querySelectorAll('.hands img')

    hands.forEach((hand) => {
      hand.addEventListener('animationend', function () {
        this.style.animation = ''
      })
      hand.addEventListener('animationstart', function () {
        this.src = 'assets/rock.png'
      })
    })

    const compOptions = ['rock', 'paper', 'scissors']

    options.forEach((option) => {
      option.addEventListener('click', function () {
        const compNumber = Math.trunc(Math.random() * 3)
        const compChoice = compOptions[compNumber]
        setTimeout(() => {
          compareHands(this.textContent, compChoice)

          playerHand.src = `assets/${this.textContent}.png`
          compHand.src = `assets/${compChoice}.png`
        }, 2000)

        playerHand.style.animation = 'shakePlayer 2s ease'
        compHand.style.animation = 'shakeComp 2s ease'
      })
    })
  }

  const updateScore = () => {
    const playerScore = document.querySelector('.player-score p')
    const compScore = document.querySelector('.comp-score p')
    playerScore.textContent = pScore
    compScore.textContent = cScore
  }

  const compareHands = (playerChoice, compChoice) => {
    const winner = document.querySelector('.winner')
    if (playerChoice === compChoice) {
      winner.textContent = "It's a tie"
      return
    }
    // check for rock
    if (playerChoice === 'rock') {
      if (compChoice === 'scissors') {
        winner.textContent = 'Player Wins'
      } else {
        winner.textContent = 'Machine Wins'
      }
    }
    // check for paper
    if (playerChoice === 'paper') {
      if (compChoice === 'scissors') {
        winner.textContent = 'Machine Wins'
      } else {
        winner.textContent = 'Player Wins'
      }
    }
    // check for scissors
    if (playerChoice === 'scissors') {
      if (compChoice === 'rock') {
        winner.textContent = 'Machine Wins'
      } else {
        winner.textContent = 'Player Wins'
      }
    }
    if (winner.textContent === 'Player Wins') {
      pScore++
    } else if (winner.textContent === 'Machine Wins') {
      cScore++
    }
    updateScore()
  }

  startGame()
  playMatch()
}

game()

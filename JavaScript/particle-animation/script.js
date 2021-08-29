window.addEventListener('click', (event) => {
  if (document.querySelector('.box')) {
    document.body.removeChild(document.querySelector('.box'))
  }

  let box = document.createElement('div')
  box.classList.add('box')
  document.body.appendChild(box)

  let n = 10
  let a = 20
  let l = 110

  for (let i = 0; i <= l; i++) {
    let angle = 0.1 * i

    // делаем место клика центром спирали
    let x = a * angle * Math.cos(angle) + event.clientX,
      y = a * angle * Math.sin(angle) + event.clientY

    // создаем n частиц для каждого угла
    for (let j = 0; j < n; j++) {
      let dot = document.createElement('div')
      dot.classList.add('dot')
      box.appendChild(dot)

      let size = anime.random(5, 10)

      dot.setAttribute(
        'style',
        `width: ${size}px; height: ${size}px; top: ${
          y + anime.random(-15, 15)
        }px; left: ${x + anime.random(-15, 15)}px; opacity: 0; background: #${(
          (Math.random() * 0xffffff) <<
          0
        ).toString(16)}`
      )
    }
  }

  /*function getRandomColor() {
        let letters = '0123456789abcdef',
            color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.trunc(Math.random() * 16)]
        }
        return color
    }*/

  anime({
    targets: document.querySelectorAll('.dot'),
    loop: false,
    easing: 'linear',

    opacity: [
      {
        value: 1,
        duration: 50,
        delay: anime.stagger(2)
      },
      {
        value: 0,
        duration: 1200
      }
    ],

    width: {
      value: 2,
      duration: 500,
      delay: anime.stagger(2)
    },
    height: {
      value: 2,
      duration: 500,
      delay: anime.stagger(2)
    },

    translateX: {
      value: () => anime.random(-30, 30),
      duration: 1500,
      delay: anime.stagger(2)
    },
    translateY: {
      value: () => anime.random(-30, 30),
      duration: 1500,
      delay: anime.stagger(2)
    }
  })
})

;(function () {
  let c, $

  let snake, snake_dir, snake_next_dir, snake_speed

  let food = {
    x: 0,
    y: 0
  }

  let score

  let wall

  let screen_snake,
    screen_menu,
    screen_setting,
    screen_gameover,
    button_newgame_menu,
    button_newgame_setting,
    button_newgame_gameover,
    button_setting_menu,
    button_setting_gameover,
    ele_score,
    speed_setting,
    wall_setting

  let activeDot = function (x, y) {
    $.fillStyle = '#fff'
    $.fillRect(x * 10, y * 10, 10, 10)
  }

  let changeDir = function (key) {
    if (key == 38 && snake_dir != 2) {
      snake_next_dir = 0
    } else if (key == 39 && snake_dir != 3) {
      snake_next_dir = 1
    } else if (key == 40 && snake_dir != 0) {
      snake_next_dir = 2
    } else if (key == 37 && snake_dir != 1) {
      snake_next_dir = 3
    }
  }

  let addFood = function () {
    food.x = Math.floor(Math.random() * (c.width / 10 - 1))
    food.y = Math.floor(Math.random() * (c.height / 10 - 1))
    for (let i = 0; i < snake.length; i++) {
      if (checkBlock(food.x, food.y, snake[i].x, snake[i].y)) {
        addFood()
      }
    }
  }

  let checkBlock = function (x, y, _x, _y) {
    return x == _x && y == _y ? true : false
  }

  let altScore = function (score_val) {
    ele_score.innerHTML = String(score_val)
  }

  let mainLoop = function () {
    let _x = snake[0].x,
      _y = snake[0].y
    snake_dir = snake_next_dir

    switch (snake_dir) {
      case 0:
        _y--
        break
      case 1:
        _x++
        break
      case 2:
        _y++
        break
      case 3:
        _x--
        break
    }

    snake.pop()
    snake.unshift({
      x: _x,
      y: _y
    })

    if (wall == 1) {
      if (
        snake[0].x < 0 ||
        snake[0].x == c.width / 10 ||
        snake[0].y < 0 ||
        snake[0].y == c.height / 10
      ) {
        showScreen(3)
        return
      }
    } else {
      for (let i = 0, x = snake.length; i < x; i++) {
        if (snake[i].x < 0) {
          snake[i].x = snake[i].x + c.width / 10
        }
        if (snake[i].x == c.width / 10) {
          snake[i].x = snake[i].x - c.width / 10
        }
        if (snake[i].y < 0) {
          snake[i].y = snake[i].y + c.height / 10
        }
        if (snake[i].y == c.height / 10) {
          snake[i].y = snake[i].y - c.height / 10
        }
      }
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        showScreen(3)
        return
      }
    }

    if (checkBlock(snake[0].x, snake[0].y, food.x, food.y)) {
      snake[snake.length] = {
        x: snake[0].x,
        y: snake[0].y
      }
      score += 1
      altScore(score)
      addFood()
      activeDot(food.x, food.y)
    }

    $.beginPath()
    $.fillStyle = '#000'
    $.fillRect(0, 0, c.width, c.height)

    for (let i = 0; i < snake.length; i++) {
      activeDot(snake[i].x, snake[i].y)
    }

    activeDot(food.x, food.y)

    setTimeout(mainLoop, snake_speed)
  }

  let newGame = function () {
    showScreen(0)
    screen_snake.focus()

    snake = []
    for (let i = 4; i >= 0; i--) {
      snake.push({
        x: i,
        y: 15
      })
    }

    snake_next_dir = 1

    score = 0
    altScore(score)

    addFood()

    c.onkeydown = function (e) {
      changeDir(e.keyCode)
      if (e.keyCode == 27) {
        snake_next_dir = null
      }
    }
    mainLoop()
  }

  let setSnakeSpeed = function (speed_value) {
    snake_speed = speed_value
  }

  let setWall = function (wall_value) {
    wall = wall_value
    if (wall == 0) {
      screen_snake.style.borderColor = '#606060'
    }
    if (wall == 1) {
      screen_snake.style.borderColor = '#fff'
    }
  }

  let showScreen = function (screen_opt) {
    switch (screen_opt) {
      case 0:
        screen_snake.style.display = 'block'
        screen_menu.style.display = 'none'
        screen_setting.style.display = 'none'
        screen_gameover.style.display = 'none'
        break
      case 1:
        screen_snake.style.display = 'none'
        screen_menu.style.display = 'block'
        screen_setting.style.display = 'none'
        screen_gameover.style.display = 'none'
        break
      case 2:
        screen_snake.style.display = 'none'
        screen_menu.style.display = 'none'
        screen_setting.style.display = 'block'
        screen_gameover.style.display = 'none'
        break
      case 3:
        screen_snake.style.display = 'none'
        screen_menu.style.display = 'none'
        screen_setting.style.display = 'none'
        screen_gameover.style.display = 'block'
        break
    }
  }

  window.onload = function () {
    c = document.querySelector('canvas')
    $ = c.getContext('2d')

    screen_snake = document.getElementById('snake')
    screen_menu = document.getElementById('menu')
    screen_gameover = document.getElementById('gameover')
    screen_setting = document.getElementById('setting')

    button_newgame_menu = document.getElementById('newgame_menu')
    button_newgame_setting = document.getElementById('newgame_setting')
    button_newgame_gameover = document.getElementById('newgame_gameover')
    button_setting_menu = document.getElementById('setting_menu')
    button_setting_gameover = document.getElementById('setting_gameover')

    ele_score = document.getElementById('score_value')
    speed_setting = document.getElementsByName('speed')
    wall_setting = document.getElementsByName('wall')

    button_newgame_menu.onclick = () => newGame()
    button_newgame_gameover.onclick = () => newGame()
    button_newgame_setting.onclick = () => newGame()
    button_setting_menu.onclick = () => showScreen(2)
    button_setting_gameover.onclick = () => showScreen(2)

    setSnakeSpeed(150)
    setWall(1)

    showScreen(1)

    for (let i = 0; i < speed_setting.length; i++) {
      speed_setting[i].addEventListener('click', () => {
        for (let i = 0; i < speed_setting.length; i++) {
          if (speed_setting[i].checked) {
            setSnakeSpeed(speed_setting[i].value)
          }
        }
      })
    }

    for (let i = 0; i < wall_setting.length; i++) {
      wall_setting[i].addEventListener('click', () => {
        for (let i = 0; i < wall_setting.length; i++) {
          if (wall_setting[i].checked) {
            setWall(wall_setting[i].value)
          }
        }
      })
    }
  }
})()

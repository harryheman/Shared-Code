const findOne = (element, selector) => element.querySelector(selector)
const findAll = (element, selector) => element.querySelectorAll(selector)
const addHandler = (element, event, callback) =>
  element.addEventListener(event, callback)

const findParent = (element, depth = 1) => {
  let parentEl = element.parentElement

  while (depth > 1) {
    parentEl = findParent(parentEl)
    depth--
  }

  return parentEl
}

const C = findOne(document.body, '.container')
const Q = findOne(C, '#questions-box')

addHandler(Q, 'submit', (ev) => ev.preventDefault())

const initRemoveQuestionBtn = (q) => {
  const removeQuestionBtn = findOne(q, '.remove-question-btn')

  addHandler(
    removeQuestionBtn,
    'click',
    (ev) => {
      findParent(ev.target, 2).remove()

      initTitles()
    },
    {
      once: true
    }
  )
}

const initRemoveAnswerBtns = (q) => {
  const removeAnswerBtns = findAll(q, '.remove-answer-btn')

  removeAnswerBtns.forEach((btn) =>
    addHandler(
      btn,
      'click',
      (ev) => {
        findParent(ev.target, 2).remove()
      },
      {
        once: true
      }
    )
  )
}

const initAddAnswerBtns = (q) => {
  const addAnswerBtns = findAll(q, '.add-answer-btn')

  addAnswerBtns.forEach((btn) =>
    addHandler(btn, 'click', (ev) => {
      const answers = findOne(findParent(ev.target), '.answers-box')

      let name
      answers.children.length > 0
        ? (name = findOne(answers, 'input[type="radio"]').name)
        : (name = Date.now())

      const template = `
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="radio" name="${name}">
                        </div>
                    </div>

                    <input class="form-control answer-text" type="text" value="">

                    <div class="input-group-append">
                        <button class="btn btn-outline-danger remove-answer-btn">X</button>
                    </div>
                </div>
                `

      answers.insertAdjacentHTML('beforeend', template)

      initRemoveAnswerBtns(q)
    })
  )
}

const initBtns = (q) => {
  initRemoveQuestionBtn(q)
  initRemoveAnswerBtns(q)
  initAddAnswerBtns(q)
}

const initTitles = () => {
  const questions = Array.from(findAll(Q, '.question-box'))

  questions.map((q) => {
    const title = findOne(q, '.title')
    title.textContent = `Question ${questions.indexOf(q) + 1}`
  })
}

initBtns(findOne(Q, '.question-box'))

initTitles()

const addQuestionBtn = findOne(C, '#add-question-btn')

addHandler(addQuestionBtn, 'click', (ev) => {
  ;(async () => {
    const data = await import('./Question.js')
    const template = await data.default()
    await Q.insertAdjacentHTML('beforeend', template)

    const question = findOne(Q, '.question-box:last-child')
    initBtns(question)
    initTitles()
  })()
})

addHandler(findOne(C, '#create-test-btn'), 'click', () => createTest())

const createTest = () => {
  const obj = {}

  const questions = Array.from(findAll(Q, '.question-box'))

  const isEmpty = (...args) => {
    args.map((arg) => {
      arg = arg.replace(/\s+/g, '').trim()
      if (arg === '') {
        alert('Some field is empty!')
        throw new Error()
      }
    })
  }

  questions.forEach((q) => {
    const questionText = findOne(q, '.question-text').value

    const answersText = []
    findAll(q, '.answer-text').forEach((text) => answersText.push(text.value))

    const rightAnswerText = findOne(
      findParent(findOne(q, 'input:checked'), 3),
      '.answer-text'
    ).value

    const explanationText = findOne(q, '.explanation-text').value

    isEmpty(questionText, ...answersText, explanationText)

    obj[questions.indexOf(q)] = {
      question: questionText,
      answers: answersText,
      rightAnswer: rightAnswerText,
      explanation: explanationText
    }
  })

  console.table(obj)

  const data = new Blob([JSON.stringify(obj)], {
    type: 'application/json'
  })

  if (findOne(C, 'a') !== null) {
    findOne(C, 'a').remove()
  }

  const link = document.createElement('a')
  link.setAttribute('href', URL.createObjectURL(data))
  link.setAttribute('download', 'data.json')
  link.className = 'btn btn-success'
  link.textContent = 'Download data'
  C.append(link)
  URL.revokeObjectURL(data)
}

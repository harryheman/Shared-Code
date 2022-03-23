// Утилита для валидации

// Валидация регистрации
module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {}

  if (username.trim() === '') {
    errors.username = 'Имя пользователя не может быть пустым'
  }
  if (email.trim() === '') {
    errors.email = 'Email не может быть пустым'
  } else {
    const regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

    if (!email.match(regExp)) {
      errors.email = 'Email должен представлять собой валидный адрес электронной почты'
    }
  }
  if (password.trim() === '') {
    errors.password = 'Пароль не может быть пустым'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

// Валидация авторизации
module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Имя пользователя не может быть пустым'
  }
  if (password.trim() === '') {
    errors.password = 'Пароль не может быть пустым'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

import { showErrorMessage } from '../utils-js/errorMessage.js'
const signupForm = document.querySelector(".signup-form")
const loginForm = document.querySelector(".login-form")

function signUp() {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value
    const confirmPassword = document.querySelector("#confirm-password").value

    if (!password || !username || !confirmPassword) {
      showErrorMessage('Please fill in all field!')
      return
    }

    if (password !== confirmPassword) {
      showErrorMessage('Passwords do not match!')
      return
    }

    const data = {
      username: username,
      password: password
    }

    try {
      const response = await fetch('/sign-up', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        window.location.href = "/login"
      } else {
        showErrorMessage('Something went wrong! Try again later.')
      }
    } catch (error) {
      showErrorMessage('Error connecting to the server.')
    }
  })
}

function login() {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value

    if (!username || !password) {
      showErrorMessage('Please fill in all fields!')
      return
    }

    const data = {
      username: username,
      password: password
    }

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        window.location.href = "/"
        let success = true
      } else if (result.message === 'Invalid credentials.') {
        showErrorMessage(result.message)
      } else {
        showErrorMessage('Something went wrong! Try again later.')
      }
    } catch (error) {
      showErrorMessage('Error connecting to the server.')
    }
  })
}

export function setupAuth() {
  const signupForm = document.querySelector('.signup-form')
  const loginForm = document.querySelector('.login-form')

  if (signupForm) signUp()
  if (loginForm) login()
}

function logoutButton() {
  const login = document.querySelector('#login')
  if (login) {
    login.classList.add('display-none')
  }

  const logout = document.querySelector('#logout')
  if (logout) {
    logout.classList.remove('display-none')
  }
} 

logoutButton()

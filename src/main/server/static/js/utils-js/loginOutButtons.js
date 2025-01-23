export function logoutButton() {
  const login = document.querySelector('#login')
  if (login) {
    login.classList.add('display-none')
  }

  const logout = document.querySelector('#logout')
  if (logout) {
    logout.classList.remove('display-none')
  }
} 

export function loginButton() {
  const login = document.querySelector('#login')
  if (login) {
    login.classList.remove('display-none')
  }

  const logout = document.querySelector('#logout')
  if (logout) {
    logout.classList.add('display-none')
  }
}
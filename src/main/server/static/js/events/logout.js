const logout = document.querySelector('#logout')
import { showErrorMessage } from '../utils-js/errorMessage.js'

export function setUpLogout() {
  if (logout) {
    logout.onclick = async () => {
      const userConfirm = confirm("Do you want to logout?")
      if (!userConfirm) return
      localStorage.removeItem('isAuthenticated')

      try {
        const response = await fetch('/login/logout', { method: 'GET' })
        if (response.ok) {
          window.location.href = '/'
        } else {
          showErrorMessage('Something went wrong during logout.')
        }
      } catch (error) {
        showErrorMessage('Error connecting to the server during logout.')
      }
    }
  }
}

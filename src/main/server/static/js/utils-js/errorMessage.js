const errorMessage = document.querySelector('.error-message')

export function showErrorMessage (message) {
  errorMessage.classList.remove('display-none')
  errorMessage.textContent = message
}

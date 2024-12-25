const toggleButton = document.getElementById('light-mode-toggle')
const body = document.body

if (localStorage.getItem('light-mode') === 'enabled') {
  body.classList.add('light-mode')
  toggleButton.src = 'assets/moon.svg'
  toggleButton.alt = 'Dark Mode'
} else {
  toggleButton.src = 'assets/sun.svg'
  toggleButton.alt = 'Light Mode'
}

toggleButton.addEventListener('click', () => {
  toggleButton.classList.add('rotate')

  setTimeout(() => {
    toggleButton.classList.remove('rotate')
  }, 500)

  const lightModeEnabled = body.classList.toggle('light-mode')

  if (lightModeEnabled) {
    localStorage.setItem('light-mode', 'enabled')
    toggleButton.src = 'assets/moon.svg'
    toggleButton.alt = 'Dark Mode'
  } else {
    localStorage.setItem('light-mode', 'disabled')
    toggleButton.src = 'assets/sun.svg'
    toggleButton.alt = 'Light Mode'
  }
})

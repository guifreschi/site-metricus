export function setupThemeToggle() {
  const body = document.body
  const toggleButton = document.getElementById('light-mode-toggle')

  if (localStorage.getItem('light-mode') === 'enabled') {
    body.classList.add('light-mode')
    toggleButton.src = '/static/assets/main-images/moon.svg'
    toggleButton.alt = 'Dark Mode'
  } else {
    toggleButton.src = '/static/assets/main-images/sun.svg'
    toggleButton.alt = 'Light Mode'
  }

  toggleButton.addEventListener('click', () => {
    toggleButton.classList.add('rotate')
    setTimeout(() => toggleButton.classList.remove('rotate'), 750)

    const lightModeEnabled = body.classList.toggle('light-mode')
    if (lightModeEnabled) {
      localStorage.setItem('light-mode', 'enabled')
      toggleButton.src = '/static/assets/main-images/moon.svg'
      toggleButton.alt = 'Dark Mode'
    } else {
      localStorage.setItem('light-mode', 'disabled')
      toggleButton.src = '/static/assets/main-images/sun.svg'
      toggleButton.alt = 'Light Mode'
    }
  })
}

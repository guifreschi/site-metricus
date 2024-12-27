const body = document.body
const toggleButton = document.getElementById('light-mode-toggle')
const switchButton = document.querySelector('#switch')
const circle = document.querySelector('#circle')

const select = document.querySelector('#select')
const back = document.querySelector('#back')
const selectSimple = document.querySelectorAll('#select #simple ul li')
const selectComplex = document.querySelectorAll('#select #complex ul li')
const unitInfo = document.querySelector('#calculator #unit-info h2')
const calculator = document.querySelector('#calculator')
const calculateButton = document.querySelector('#calculate-operation')
const result = document.querySelector('#result')

const complexOperations = document.querySelectorAll('div .complex-operations')
const simpleOperations = document.querySelectorAll('div .simple-operations')

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

  setTimeout(() => {
    toggleButton.classList.remove('rotate')
  }, 500)

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

const startButton = document.querySelector('#start button')

startButton.onclick = (e) => {
  e.preventDefault()
  const baseURL = 'http://127.0.0.1:5000/'
  console.log(`${baseURL}/conversion`)
  window.location.href = `${baseURL}/conversion`
}

switchButton.onclick = () => {
  circle.classList.toggle('circle-animation')
} 

function preventNegativeValues(event) {
  const input = event.target
  if (input.value < 0) {
    input.value = ""
    alert("The value cannot be negative.")
  }
}

const inputFields = document.querySelectorAll('input[type="number"]')
inputFields.forEach(input => {
  input.addEventListener('input', preventNegativeValues)
})

selectSimple.forEach(item => {
  item.onclick = () => {
    unitInfo.textContent = item.id
    calculator.classList.remove('display-none')
    select.classList.add('display-none')
    complexOperations.forEach(operation => operation.classList.add('display-none'))
    simpleOperations.forEach(operation => operation.classList.remove('display-none'))
    location.reload()
  }
})

selectComplex.forEach(item => {
  item.onclick = () => {
    const unitName = item.id.replace('-', ' ')
    unitInfo.textContent = unitName
    calculator.classList.remove('display-none')
    select.classList.add('display-none')
    simpleOperations.forEach(operation => operation.classList.add('display-none'))
    complexOperations.forEach(operation => operation.classList.remove('display-none'))
    location.reload()
  }
})

back.onclick = () => {
  calculator.classList.add('display-none')
  select.classList.remove('display-none')
  location.reload()
}

calculateButton.onclick = (e) => {
  e.preventDefault()
  const inputs = document.querySelectorAll('input')
  result.classList.remove('display-none')
  inputs.forEach(input => {
    input.value = ""
  })
  inputs[0].focus()
  location.reload()
}

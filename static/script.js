const baseURL = 'http://127.0.0.1:5000'
const body = document.body
const toggleButton = document.getElementById('light-mode-toggle')
const switchButton = document.querySelector('#switch')
const circle = document.querySelector('#circle')

const select = document.querySelector('#select')
const back = document.querySelector('#back')
const backHome = document.querySelector('#back-home')
const selectSimple = document.querySelectorAll('#select #simple ul li')
const selectComplex = document.querySelectorAll('#select #complex ul li')
const unitInfo = document.querySelector('#calculator #unit-info h2')
const calculator = document.querySelector('#calculator')
const calculateButton = document.querySelector('#calculate-operation')
const result = document.querySelector('#result')

const complexOperations = document.querySelectorAll('div .complex-operations')
const simpleOperations = document.querySelectorAll('div .simple-operations')

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('theme-loaded')
  }, 300) 
})

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

if (startButton) {
  startButton.onclick = (e) => {
    e.preventDefault()
    console.log(`${baseURL}/conversion`)
    window.location.href = `${baseURL}/conversion`
  }
}

if (switchButton) {
  switchButton.onclick = () => {
    circle.classList.toggle('circle-animation')
    
    if (circle.classList.contains('rounded-result-true')) {
      circle.classList.remove('rounded-result-true')
      circle.classList.add('rounded-result-false')
    } else {
      circle.classList.remove('rounded-result-false')
      circle.classList.add('rounded-result-true')
    }
  }
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
    console.log(item.id)
    localStorage.setItem('unitId', item.id)
    window.location.href = `${baseURL}/conversion/calculator`
  }
})

selectComplex.forEach(item => {
  item.onclick = () => {
    const unitName = item.id.replace('-', ' ')
    console.log(unitName)
    localStorage.setItem('unitId', unitName)
    window.location.href = `${baseURL}/conversion/calculator`
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const unitId = localStorage.getItem('unitId')
  if (!unitInfo) {
    console.error('Element unitInfo not found!')
    return
  }

  if (unitId) {
    unitInfo.textContent = unitId
    console.log("Item:", unitId)
  } else {
    console.error('No item on localStorage!')
  }
})

if (back) {
  back.onclick = () => {
    window.location.href = `${baseURL}/conversion`
  }
}

if (backHome) {
  backHome.onclick = () => {
    window.location.href = `${baseURL}/`
  }
}

document.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const clickedId = item.id
    if (clickedId) {
      fetch('/conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clicked_id: clickedId })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          console.log('Data successfully received')
          window.location.href = `/conversion/calculator?unit=${clickedId}`
        }
      })
      .catch(error => console.error('Error:', error))
    } else {
      console.log("No valid ID found to send.")
    }
  })
})

const roundedResultElements = document.querySelectorAll('#circle')
const simpleValue = document.querySelector('#value')
const simpleFromUnit = document.querySelector('#from-unit')
const simpleToUnit = document.querySelector('#to-unit')
const finalResult = document.querySelector('#result span')
const unitH2 = document.querySelector('#unit-info h2')

const firstValue = document.querySelector('#first-value')
const secondValue = document.querySelector('#second-value')
const resultUnit = document.querySelector('#result-unit')
const fromUnitSelect= document.querySelector('#from-unit-selector')
const toUnitSelect = document.querySelector('#to-unit-selector')
const inputs = document.querySelectorAll('input')
const errorMessage = document.querySelector('#error-message')
closeWarning = document.querySelector('#close-warning')

if (calculateButton) {
  calculateButton.onclick = (e) => {
    e.preventDefault()

    const roundedResultClasses = Array.from(roundedResultElements).map(el => Array.from(el.classList))

    const requestBody = {
      simpleValue: simpleValue ? simpleValue.value || '' : '',
      simpleFromUnit: simpleFromUnit ? simpleFromUnit.value.trim() || '' : '',
      simpleToUnit: simpleToUnit ? simpleToUnit.value.trim() || '' : '',
      roundedResult: roundedResultClasses,
      unitName: unitH2 ? unitH2.textContent : '',
      firstValue: firstValue ? firstValue.value || '' : '',
      secondValue: secondValue ? secondValue.value || '' : '',
      resultUnit: resultUnit ? resultUnit.value.trim() || '' : '',
      fromUnitSelect: fromUnitSelect ? fromUnitSelect.value || '' : '',
      toUnitSelect: toUnitSelect ? toUnitSelect.value || '' : '',
    }

    fetch('/conversion/calculator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Resposta do servidor:', data)
      if (data.success) {
        finalResult.textContent = data.message
        errorMessage.style.display = 'none';

        inputs[0].focus()
        setTimeout(() => {
          inputs.forEach(input => {
            input.value = ""
          })
        }, 1000)

        result.classList.remove('display-none')
      } else {
        result.classList.add('display-none')
        console.error('Erro no cálculo:', data.message)
        errorMessage.style.display = 'flex';
        closeWarning.onclick = () => {
          errorMessage.style.display = 'none';
          setTimeout(() => {
            inputs.forEach(input => {
              inputs[0].focus()
            })
          }, 1000)
          }

      }
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error)
    })
  }
}

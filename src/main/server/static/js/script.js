// const baseURL = 'https://metricus.onrender.com' // change here
const baseURL = 'http://127.0.0.1:5000' // change here
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
  }, 270) 
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
  }, 750)

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

let isNavigating = false

selectSimple.forEach(item => {
  const navigate = () => {
    if (isNavigating) return
    isNavigating = true

    console.log(item.id)
    localStorage.setItem('unitId', item.id)
  }

  item.onclick = navigate
  item.addEventListener('touchstart', navigate)
})

selectComplex.forEach(item => {
  const navigate = () => {
    if (isNavigating) return
    isNavigating = true

    const unitName = item.id.replace('-', ' ')
    console.log(unitName)
    localStorage.setItem('unitId', unitName)
  }

  item.onclick = navigate
  item.addEventListener('touchstart', navigate)
})

document.addEventListener('DOMContentLoaded', () => {
  const unitId = localStorage.getItem('unitId')

  if (!unitInfo) {
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
          window.location.href = `${baseURL}/conversion/calculator`
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
        errorMessage.style.display = 'none'

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
        errorMessage.style.display = 'flex'
        closeWarning.onclick = () => {
          errorMessage.style.display = 'none'
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

const historyPage = document.querySelector('#history')
const backConversion = document.getElementById('back-conversion')

if (backConversion) {
  backConversion.onclick = () => {
    window.location.href = `${baseURL}/conversion`
  }
}

if (historyPage) {
  historyPage.onclick = () => {
    window.location.href = `${baseURL}/conversion/history`
  }
}

const listConversion = document.getElementById('list-conversions')

if (listConversion) {
  fetch('/conversion/history/data')
.then(response => response.json())
.then(data => {
  console.log(data)

  const clearHistory = document.getElementById('clean-history')
  const limitedData = data.slice(0, 5)

  if (data.length > 0) {
    limitedData.forEach(item => {
      const ul = document.createElement('ul')
      const li = document.createElement('li')
      const div = document.createElement('div')
      const deleteButton = document.createElement('img')

      div.classList.add('delete-conversion')
      deleteButton.src = '/static/assets/main-images/bin.svg'
      deleteButton.alt = 'Delete conversion'
      deleteButton.dataset.id = item.id

      deleteButton.onclick = async () => {
        try {
          const response = await fetch('/conversion/history/delete', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({
              id: item.id
            })
          })

          const result = await response.json()

          if (result.success) {
            ul.remove()
          } else {
            console.error('Error deleting item:', result.message)
          }
        } catch (error) {
          console.error('Request failed:', error)
        }
      }

      li.textContent = item.message
      div.appendChild(deleteButton)
      ul.appendChild(li)
      ul.appendChild(div)
      listConversion.appendChild(ul)
    })

    clearHistory.onclick = async () => {
      const confirmation = confirm("Are you sure you want to clear all history?")

      if (confirmation) {
        try {
          const response = await fetch('/conversion/history/clear', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            }
          })

          const result = await response.json()

          if (result.success) {
            listConversion.innerHTML = ''
          } else {
            console.error('Error clearing history:', result.message)
          }
        } catch (error) {
          console.error('Request failed:', error)
        }
      }
    }
  } else {
    const noConversion = document.getElementById('no-conversion')
    noConversion.classList.remove('display-none')
  }
  }).catch(error => {
    console.error('Error loading data:', error)
  })
}

const loginForm = document.querySelector('.login-container')

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("Enviado!")
  })
}

const loginLinkButton = document.getElementById('login')
const signUpLinkButton = document.getElementById('sign-up')

if (loginLinkButton || signUpLinkButton) {
  loginLinkButton.onclick = () => window.location.href = `${baseURL}/login`
  signUpLinkButton.onclick = () => window.location.href = `${baseURL}/sign-up`
}

const metricusGUIButton = document.querySelector('#metricusgui button')

metricusGUIButton.onclick = () => {
  fetch(`${baseURL}/metricusgui`).then(response => response.json())
  .then(data => {
    if (!data.success) {
      alert("It was not possible to open MetricusGUI. Error:", data.message)
    }
  })
}

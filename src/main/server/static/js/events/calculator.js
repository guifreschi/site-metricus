const roundedResultElements = document.querySelectorAll('#circle')
const simpleValue = document.querySelector('#value')
const simpleFromUnit = document.querySelector('#from-unit')
const simpleToUnit = document.querySelector('#to-unit')
const finalResult = document.querySelector('#result span')
const unitH2 = document.querySelector('#unit-info h2')
const result = document.querySelector('#result')

const firstValue = document.querySelector('#first-value')
const secondValue = document.querySelector('#second-value')
const resultUnit = document.querySelector('#result-unit')
const fromUnitSelect = document.querySelector('#from-unit-selector')
const toUnitSelect = document.querySelector('#to-unit-selector')
const inputs = document.querySelectorAll('input')
const errorMessage = document.querySelector('#error-message')
const closeWarning = document.querySelector('#close-warning')

export function setupCalculator(calculateButton) {
  setupSwitchButton()
  calculateButton.onclick = (e) => {
    e.preventDefault()

    const roundedResultClasses = Array.from(roundedResultElements).map(el => Array.from(el.classList))

    console.log("Simple Value:", simpleValue)

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
              input[0].focus()
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

export function setupSwitchButton() {
  const switchButton = document.querySelector('#switch')
  const circle = document.querySelector('#circle')

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
}
export function setupUnitID() {
  const selectSimple = document.querySelectorAll('#select #simple ul li')
  const selectComplex = document.querySelectorAll('#select #complex ul li')
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

  const unitId = localStorage.getItem('unitId')
  const unitInfo = document.querySelector('#unit-info h2')

  if (!unitInfo) {
    return
  }

  if (unitId) {
    unitInfo.textContent = unitId
    console.log("Item:", unitId)
  } else {
    console.error('No item on localStorage!')
  }
}

export function setupForms(baseURL) {
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
}

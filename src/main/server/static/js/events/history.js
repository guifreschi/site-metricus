export function setupHistory() {
  const listConversion = document.getElementById('list-conversions')

  if (!listConversion) return

  const loadHistory = async () => {
    try {
      const response = await fetch('/conversion/history/data')
      const data = await response.json()
      console.log(data)

      if (data.length > 0) {
        renderHistory(data.slice(0, 5))
      } else {
        displayNoConversionMessage()
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const renderHistory = (data) => {
    data.forEach((item) => {
      const ul = document.createElement('ul')
      const li = document.createElement('li')
      const div = document.createElement('div')
      const deleteButton = document.createElement('img')

      div.classList.add('delete-conversion')
      deleteButton.src = '/static/assets/main-images/bin.svg'
      deleteButton.alt = 'Delete conversion'
      deleteButton.dataset.id = item.id

      deleteButton.onclick = () => deleteItem(item.id, ul)

      li.textContent = item.message
      div.appendChild(deleteButton)
      ul.appendChild(li)
      ul.appendChild(div)
      listConversion.appendChild(ul)
    })

    setupClearHistory()
  }

  const deleteItem = async (id, ul) => {
    try {
      const response = await fetch('/conversion/history/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
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

  const setupClearHistory = () => {
    const clearHistory = document.getElementById('clean-history')

    if (!clearHistory) return

    clearHistory.onclick = async () => {
      const confirmation = confirm('Are you sure you want to clear all history?')

      if (!confirmation) return

      try {
        const response = await fetch('/conversion/history/clear', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
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

  const displayNoConversionMessage = () => {
    const noConversion = document.getElementById('no-conversion')
    if (noConversion) noConversion.classList.remove('display-none')
  }

  loadHistory()
}

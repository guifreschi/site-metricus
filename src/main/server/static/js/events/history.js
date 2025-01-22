const noConversion = document.getElementById('no-conversion')

export function setupHistory() {
  const listConversion = document.getElementById('list-conversions')

  if (!listConversion) return

  const loadHistory = async (page = 1, limit = 7) => {
    try {
      const response = await fetch(`/conversion/history/data?page=${page}&limit=${limit}`)
      const result = await response.json()
  
      const { data, total_pages } = result
  
      if (data.length > 0) {
        listConversion.innerHTML = ''
        renderHistory(data)
        renderPagination(page, total_pages)
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

  const renderPagination = (currentPage, totalPages) => {
    const paginationContainer = document.getElementById('pagination')
    paginationContainer.innerHTML = '' 
  
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button')
      pageButton.textContent = i
      pageButton.classList.add('pagination-button')
      if (i === currentPage) pageButton.classList.add('active')
  
      pageButton.onclick = () => loadHistory(i)
      paginationContainer.appendChild(pageButton)
    }
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
          const paginationContainer = document.getElementById('pagination')
          paginationContainer.innerHTML = ''
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
    if (noConversion) noConversion.classList.remove('display-none')
  }

  loadHistory()
}

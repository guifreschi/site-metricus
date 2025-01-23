export async function clearHistory(listConversion) {
  const clearHistory = document.getElementById('clean-history')
  
  if (!clearHistory) return

  clearHistory.onclick = async () => {
    const confirmation = confirm('Are you sure you want to clear all history?')

    if (!confirmation) return

    try {
      const response = await fetch('/conversion/history/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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

import { renderHistory, renderPagination } from '../utils-js/pagination.js'
import { displayNoConversionMessage } from '../utils-js/ui.js'

export async function loadHistory(page = 1, limit = 7) {
  const listConversion = document.getElementById('list-conversions')

  try {
    const response = await fetch(`/conversion/history/data?page=${page}&limit=${limit}`)
    const result = await response.json()
  
    const { data, total_pages } = result
  
    if (data.length > 0) {
      if (listConversion) listConversion.innerHTML = ''
      renderHistory(data, listConversion)
      renderPagination(page, total_pages, loadHistory)
    } else {
      displayNoConversionMessage()
    }
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

import { loadHistory } from './history.js'
import { clearHistory } from './clearHistory.js'

export function setupHistory() {
  const listConversion = document.getElementById('list-conversions')

  if (!listConversion) return

  loadHistory()

  clearHistory(listConversion)
}

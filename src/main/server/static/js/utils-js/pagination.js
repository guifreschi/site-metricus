import { deleteItem } from '../utils-js/deleteItem.js'

export function renderHistory(data, listConversion) {
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
    if (listConversion) listConversion.appendChild(ul)
  })
}

export function renderPagination(currentPage, totalPages, loadHistory) {
  const paginationContainer = document.getElementById('pagination')
  if (paginationContainer) paginationContainer.innerHTML = '' 

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button')
    pageButton.textContent = i
    pageButton.classList.add('pagination-button')
    
    if (i === currentPage) pageButton.classList.add('active')
  
    pageButton.onclick = () => loadHistory(i)
    if (paginationContainer) paginationContainer.appendChild(pageButton)
  }
}

export async function deleteItem(id, ul) {
  try {
    const response = await fetch('/conversion/history/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
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

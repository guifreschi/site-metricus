export function preventNegativeValues(event) {
  const input = event.target
  if (input.value < 0) {
    input.value = ""
    alert("The value cannot be negative.")
  }
}

export function addInputListeners(inputs) {
  inputs.forEach(input => {
    input.addEventListener('input', preventNegativeValues)
  })
}

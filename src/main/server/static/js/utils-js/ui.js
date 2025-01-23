export const noConversion = document.getElementById('no-conversion')

export function displayNoConversionMessage() {
  if (noConversion) noConversion.classList.remove('display-none')
}

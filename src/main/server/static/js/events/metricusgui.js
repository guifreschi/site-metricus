export function setupMetricusGui(baseURL) {
  const metricusGUIButton = document.querySelector('#metricusgui button')
  
  metricusGUIButton.onclick = () => {
    fetch(`${baseURL}/metricusgui`).then(response => response.json())
    .then(data => {
      if (!data.success) {
        alert("It was not possible to open MetricusGUI. Error:", data.message)
      }
    })
  }
}

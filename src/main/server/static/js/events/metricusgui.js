export function setupMetricusGui(baseURL) {
  const metricusGUIButton = document.querySelector('#metricusgui button')
  
  if (metricusGUIButton) {
    metricusGUIButton.onclick = () => {
      fetch(`${baseURL}/metricusgui`).then(response => response.json())
      .then(data => {
        if (!data.success) {
          alert("It was not possible to open MetricusGUI. Error:", data.message)
        }
      })
    }
  }
}

export function setupNavigation(baseURL) {
  const back = document.querySelector('#back')
  const backHome = document.querySelector('#back-home')
  const historyPage = document.querySelector('#history')
  const backConversion = document.getElementById('back-conversion')
  

  if (back) {
    back.onclick = () => window.location.href = `${baseURL}/conversion`
  }

  if (backHome) {
    backHome.onclick = () => window.location.href = `${baseURL}/`
  }

  if (historyPage) {
    historyPage.onclick = () => window.location.href = `${baseURL}/conversion/history`
  }

  if (backConversion) {
    backConversion.onclick = () => window.location.href = `${baseURL}/conversion`
  }
}

export function setupStartConversions(baseURL) {
  const startButton = document.querySelector('#start button')
  
  if (startButton) {
    startButton.onclick = (e) => {
      e.preventDefault()
      window.location.href = `${baseURL}/conversion`
    }
  }
}

export function setupLogin(baseURL) {
  const loginLinkButton = document.getElementById('login')
  const signUpLinkButton = document.getElementById('sign-up')
  
  if (loginLinkButton || signUpLinkButton) {
    loginLinkButton.onclick = () => {
      window.location.href = `${baseURL}/login`
    } 
    signUpLinkButton.onclick = () => {
      window.location.href = `${baseURL}/sign-up`
    } 
  }
}

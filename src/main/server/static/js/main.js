"use strict"

import { baseURL } from './config.js'
import { setupThemeToggle } from './events/themeToggle.js'
import { addInputListeners } from './utils-js/domUtils.js'
import { loadHistory } from './events/history.js'
import { setupCalculator } from './events/calculator.js'
import { setupForms, setupUnitID } from './events/formHandlers.js'
import { setupNavigation, setupStartConversions, setupLogin } from './events/navigation.js'
import { setupAuth } from './events/loginSignUp.js'
import { setUpLogout } from './events/logout.js'
import { loginButton, logoutButton } from './utils-js/loginOutButtons.js'

const calculateButton = document.querySelector('#calculate-operation')

// Wait for the DOM to fully load before initializing
document.addEventListener('DOMContentLoaded', () => {
  // Delay applying the theme-loaded class for a smooth visual effect
  setTimeout(() => {
    document.body.classList.add('theme-loaded')
  }, 270)

  // Initialize theme toggle functionality (e.g., light/dark mode switching)
  setupThemeToggle()
  
  // Initialize navigation components using the local base URL
  setupNavigation(baseURL)

  // Configure login and sign-up handlers with the base URL for requests
  setupLogin(baseURL)
  setupAuth()
  setUpLogout()

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (isAuthenticated) {
    logoutButton()
  } else loginButton()

  // Configure the button to start conversions with the base URL
  setupStartConversions(baseURL)


  // Initialize form-related configurations, including unit ID settings
  setupUnitID()
  setupForms(baseURL)

  // Add input listeners for all number fields to handle validation or dynamic changes
  const inputFields = document.querySelectorAll('input[type="number"]')
  addInputListeners(inputFields)

  // Initialize the history page if the user navigates to it
  loadHistory()

  // Configure calculator functionality if the calculate button is available
  if (calculateButton) {
    setupCalculator(calculateButton)
    console.log(calculateButton) // Debug log to verify the button exists
  }
})

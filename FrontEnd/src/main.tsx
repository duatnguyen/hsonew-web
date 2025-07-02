import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import $ from 'jquery'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import jQuery (if needed)
window.$ = window.jQuery = $ as any;

// Ensure Bootstrap is available globally
declare global {
  interface Window {
    bootstrap: any;
  }
}

const root = document.getElementById('root')

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

import '@testing-library/jest-dom'

// Suppress React Router v6 future flag deprecation warnings in tests
const originalWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) return
  originalWarn.call(console, ...args)
}

// Reset sessionStorage giua cac test de tranh phien dang nhap (AuthContext)
// bi ro ri tu test nay sang test khac trong cung 1 file
afterEach(() => {
  window.sessionStorage.clear()
})

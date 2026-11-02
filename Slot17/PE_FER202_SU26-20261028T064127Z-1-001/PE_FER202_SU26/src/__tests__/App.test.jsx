import { render, screen } from '@testing-library/react'
import App from '../App'

test('scaffold renders without crashing', () => {
  render(<App />)
  expect(screen.getByText(/Scaffold OK/i)).toBeInTheDocument()
})

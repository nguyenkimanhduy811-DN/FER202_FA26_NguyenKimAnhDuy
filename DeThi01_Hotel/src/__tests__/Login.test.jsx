import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Login from '../pages/Login'
import * as authApi from '../api/authApi'

jest.mock('../api/authApi')

const mockAuthCtx = { loginUser: jest.fn(), isAuthenticated: false, user: null }

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthCtx}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe('TODO-01: Login — hiển thị lỗi khi đăng nhập thất bại', () => {
  test('hiển thị Alert khi user có role User (không phải Admin)', async () => {
    authApi.login.mockRejectedValue(new Error('Access denied. Only Admin users can log in.'))
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'user1' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'user123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  test('Alert chứa thông báo lỗi từ server', async () => {
    authApi.login.mockRejectedValue(new Error('Invalid username or password.'))
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'wronguser' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid username or password.')
    })
  })
})

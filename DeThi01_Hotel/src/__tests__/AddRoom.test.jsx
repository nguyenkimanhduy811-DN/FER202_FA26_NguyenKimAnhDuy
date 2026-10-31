import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { RoomContext } from '../context/RoomContext'
import AddRoom from '../pages/AddRoom'
import * as roomApi from '../api/roomApi'

jest.mock('../api/roomApi')

const mockRoomTypes = [
  { id: '1', name: 'Standard' },
  { id: '2', name: 'Deluxe' },
  { id: '3', name: 'Suite' },
]

const mockAuthCtx = { user: { email: 'admin@hotel.com', role: 'Admin' }, isAuthenticated: true, logoutUser: jest.fn() }
const mockRoomCtx = { state: { rooms: [], loading: false }, dispatch: jest.fn() }

const renderAddRoom = () =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthCtx}>
        <RoomContext.Provider value={mockRoomCtx}>
          <AddRoom />
        </RoomContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe('TODO-04: AddRoom — dropdown RoomType từ API', () => {
  beforeEach(() => {
    roomApi.fetchRoomTypes.mockResolvedValue(mockRoomTypes)
  })

  test('gọi fetchRoomTypes khi component mount', async () => {
    renderAddRoom()
    await waitFor(() => {
      expect(roomApi.fetchRoomTypes).toHaveBeenCalled()
    })
  })

  test('hiển thị đủ các option RoomType trong dropdown', async () => {
    renderAddRoom()
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Standard' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Deluxe' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Suite' })).toBeInTheDocument()
    })
  })
})

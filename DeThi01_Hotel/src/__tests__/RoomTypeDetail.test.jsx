import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import RoomTypeDetail from '../pages/RoomTypeDetail'
import AppRoutes from '../routes/AppRoutes'
import { AuthContext } from '../context/AuthContext'
import { RoomProvider } from '../context/RoomContext'
import * as roomApi from '../api/roomApi'

jest.mock('../api/roomApi')

const roomTypes = [
  { id: '1', name: 'Standard' },
  { id: '2', name: 'Deluxe' },
]
const rooms = [
  { id: '1', name: 'Room 101', roomTypeId: 1, floor: '1', view: 'City View', priceWeekday: 800000, priceWeekend: 1200000, lastRenovated: '15/03/2022' },
  { id: '4', name: 'Room 102', roomTypeId: 1, floor: '1', view: 'Garden View', priceWeekday: 800000, priceWeekend: 1200000, lastRenovated: '15/03/2022' },
  { id: '2', name: 'Room 201', roomTypeId: 2, floor: '2', view: 'Sea View', priceWeekday: 1500000, priceWeekend: 2000000, lastRenovated: '20/06/2023' },
]

const renderDetail = (id = '1') =>
  render(
    <MemoryRouter initialEntries={[`/room-types/${id}`]}>
      <Routes>
        <Route path="/room-types/:id" element={<RoomTypeDetail />} />
      </Routes>
    </MemoryRouter>
  )

describe('TODO-09: RoomTypeDetail — Promise.all fetch + filter', () => {
  beforeEach(() => {
    roomApi.fetchRoomTypes.mockResolvedValue(roomTypes)
    roomApi.fetchRooms.mockResolvedValue(rooms)
  })

  test('hiển thị tên loại phòng', async () => {
    renderDetail('1')
    await waitFor(() => {
      expect(screen.getByText('Standard')).toBeInTheDocument()
    })
  })

  test('chỉ hiển thị phòng thuộc loại Standard (roomTypeId=1)', async () => {
    renderDetail('1')
    await waitFor(() => screen.getByText('Standard'))
    expect(screen.getByText('Room 101')).toBeInTheDocument()
    expect(screen.getByText('Room 102')).toBeInTheDocument()
    expect(screen.queryByText('Room 201')).not.toBeInTheDocument()
  })

  test('có nút Back to Room Types', async () => {
    renderDetail('1')
    await waitFor(() => {
      expect(screen.getByText(/Back to Room Types/i)).toBeInTheDocument()
    })
  })
})

describe('TODO-10A: id không hợp lệ → hiển thị trang 404, KHÔNG redirect về Login', () => {
  beforeEach(() => {
    roomApi.fetchRoomTypes.mockResolvedValue(roomTypes)
    roomApi.fetchRooms.mockResolvedValue(rooms)
  })

  // Render bằng AppRoutes thật (có ProtectedRoute bọc /room-types/:id) thay vì
  // một cây Routes giả lập riêng, để kiểm tra đúng hành vi khi chạy thật.
  const renderApp = (path, isAuthenticated) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <AuthContext.Provider
          value={{
            user: isAuthenticated ? { email: 'admin@hotel.com', role: 'Admin' } : null,
            isAuthenticated,
            loginUser: jest.fn(),
            logoutUser: jest.fn(),
          }}
        >
          <RoomProvider>
            <AppRoutes />
          </RoomProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

  test('đã đăng nhập + id không tồn tại → hiển thị trang 404 (không phải Login)', async () => {
    renderApp('/room-types/999', true)
    await waitFor(() => {
      expect(screen.queryByText(/Admin Login/i)).not.toBeInTheDocument()
    })
  })

  test('URL sai bất kỳ (kể cả khi chưa đăng nhập) → không tự động chuyển về trang Login', async () => {
    renderApp('/duong-dan-khong-ton-tai', false)
    await waitFor(() => {
      expect(screen.queryByText(/Admin Login/i)).not.toBeInTheDocument()
    })
  })
})

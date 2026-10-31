import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { RoomContext } from '../context/RoomContext'
import RoomDetail from '../pages/RoomDetail'
import * as roomApi from '../api/roomApi'

jest.mock('../api/roomApi')

const mockRoom = {
  id: '1', name: 'Room 101', roomTypeId: 1, floor: '1',
  view: 'City View', priceWeekday: 800000, priceWeekend: 1200000, lastRenovated: '15/03/2022'
}

const mockCtx = {
  state: { roomTypes: [{ id: 1, name: 'Standard' }], rooms: [], loading: false, error: null },
  dispatch: jest.fn(),
}

const renderRoomDetail = () =>
  render(
    <RoomContext.Provider value={mockCtx}>
      <MemoryRouter initialEntries={['/rooms/1']}>
        <Routes>
          <Route path="/rooms/:id" element={<RoomDetail />} />
        </Routes>
      </MemoryRouter>
    </RoomContext.Provider>
  )

describe('TODO-05: RoomDetail — fetch và hiển thị thông tin phòng', () => {
  test('hiển thị tên phòng sau khi load', async () => {
    roomApi.fetchRoomById.mockResolvedValue(mockRoom)
    renderRoomDetail()
    await waitFor(() => {
      expect(screen.getByText('Room 101')).toBeInTheDocument()
    })
  })

  test('hiển thị Spinner khi đang loading', () => {
    roomApi.fetchRoomById.mockReturnValue(new Promise(() => {}))
    renderRoomDetail()
    expect(document.querySelector('.spinner-border') || screen.queryByRole('status')).toBeTruthy()
  })

  test('có nút Back', async () => {
    roomApi.fetchRoomById.mockResolvedValue(mockRoom)
    renderRoomDetail()
    await waitFor(() => {
      expect(screen.getByText(/back/i)).toBeInTheDocument()
    })
  })
})

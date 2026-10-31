import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RoomRow from '../components/RoomRow'

const mockRoom = {
  id: '1', name: 'Room 101', roomType: 'Standard', floor: '1',
  view: 'City View', priceWeekday: 800000, priceWeekend: 1200000, lastRenovated: '15/03/2022'
}

const mockDelete = jest.fn()

const renderRow = (room = mockRoom) =>
  render(
    <MemoryRouter>
      <table><tbody>
        <RoomRow room={room} index={1} onDelete={mockDelete} />
      </tbody></table>
    </MemoryRouter>
  )

describe('TODO-06: RoomRow — Delete với ModalConfirm', () => {
  test('nhấn Delete → modal xuất hiện với tên phòng', async () => {
    renderRow()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => {
      expect(screen.getByText(/Room 101/)).toBeInTheDocument()
    })
  })

  test('xác nhận modal → gọi onDelete với id phòng', async () => {
    renderRow()
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    await waitFor(() => screen.getByText(/Room 101/))
    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }))
    expect(mockDelete).toHaveBeenCalledWith('1')
  })
})

describe('TODO-07: RoomRow — Price Range column', () => {
  test('hiển thị giá weekday trong cột Price Range', () => {
    renderRow()
    expect(screen.getByText(/800/)).toBeInTheDocument()
  })

  test('hiển thị giá weekend trong cột Price Range', () => {
    renderRow()
    expect(screen.getByText(/1.200|1,200/)).toBeInTheDocument()
  })
})

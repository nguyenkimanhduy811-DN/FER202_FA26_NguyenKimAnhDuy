import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ManageRoomTypes from '../pages/ManageRoomTypes'
import * as roomApi from '../api/roomApi'

jest.mock('../api/roomApi')

const initialRoomTypes = [
  { id: '1', name: 'Standard' },
  { id: '2', name: 'Deluxe' },
]

const renderPage = () =>
  render(
    <MemoryRouter>
      <ManageRoomTypes />
    </MemoryRouter>
  )

describe('TODO-10A: ManageRoomTypes — Thêm loại phòng mới', () => {
  beforeEach(() => {
    roomApi.fetchRoomTypes.mockResolvedValue([...initialRoomTypes])
    roomApi.addRoomType.mockResolvedValue({ id: '6', name: 'Penthouse' })
  })

  test('form có placeholder "e.g. Penthouse"', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Standard'))
    expect(screen.getByPlaceholderText('e.g. Penthouse')).toBeInTheDocument()
  })

  test('thêm roomType mới → xuất hiện trong danh sách', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Standard'))
    fireEvent.change(screen.getByPlaceholderText('e.g. Penthouse'), { target: { value: 'Penthouse' } })
    fireEvent.click(screen.getByRole('button', { name: /add room type/i }))
    await waitFor(() => {
      expect(screen.getByText('Penthouse')).toBeInTheDocument()
    })
  })
})

describe('TODO-10B: ManageRoomTypes — Xoá loại phòng với ModalConfirm', () => {
  beforeEach(() => {
    roomApi.fetchRoomTypes.mockResolvedValue([...initialRoomTypes])
    roomApi.deleteRoomType.mockResolvedValue({})
  })

  test('nhấn Delete → modal hiện tên loại phòng', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Standard'))
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])
    await waitFor(() => {
      expect(screen.getByText(/Standard/)).toBeInTheDocument()
    })
  })
})

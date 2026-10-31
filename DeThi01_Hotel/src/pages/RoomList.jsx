import { useState } from 'react'
import { Table, Spinner, Alert, Pagination, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useRoom } from '../context/RoomContext'
import { deleteRoom } from '../api/roomApi'
import FilterBar from '../components/FilterBar'
import RoomRow from '../components/RoomRow'

const PAGE_SIZE = 5

export default function RoomList() {
  const { state, dispatch } = useRoom()
  const { rooms, roomTypes, loading, error } = state
  const navigate = useNavigate()
  const [nameFilter, setNameFilter] = useState('')
  const [roomTypeFilter, setRoomTypeFilter] = useState('')
  const [page, setPage] = useState(1)

  const enriched = rooms.map((r) => ({
    ...r,
    roomType: roomTypes.find((rt) => String(rt.id) === String(r.roomTypeId))?.name ?? '—',
  }))

  const filtered = enriched.filter((r) => {
    const nameMatch = r.name.toLowerCase().includes(nameFilter.toLowerCase())
    const typeMatch = !roomTypeFilter || String(r.roomTypeId) === String(roomTypeFilter)
    return nameMatch && typeMatch
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id)
      dispatch({ type: 'DELETE_ROOM', payload: id })
    } catch {
      alert('Failed to delete room.')
    }
  }

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Room List</h2>
        <Button variant="primary" onClick={() => navigate('/add')}>+ Add Room</Button>
      </div>
      <FilterBar
        nameFilter={nameFilter}
        setNameFilter={(v) => { setNameFilter(v); setPage(1) }}
        roomTypeFilter={roomTypeFilter}
        setRoomTypeFilter={(v) => { setRoomTypeFilter(v); setPage(1) }}
        roomTypes={roomTypes}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Room Type</th>
            <th>Floor</th>
            <th>View</th>
            <th>Last Renovated</th>
            <th>Price Range</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr><td colSpan={8} className="text-center">No rooms found.</td></tr>
          ) : (
            paginated.map((r, i) => (
              <RoomRow
                key={r.id}
                room={r}
                index={(page - 1) * PAGE_SIZE + i + 1}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  )
}

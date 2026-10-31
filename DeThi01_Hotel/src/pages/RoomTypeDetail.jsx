import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchRoomTypes, fetchRooms } from '../api/roomApi'
import { formatPriceRange } from '../utils/format'

export default function RoomTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roomType, setRoomType] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      // TODO-10A: Dùng Promise.all fetch roomTypes + rooms
      // Tìm roomType theo id; nếu không tìm thấy → navigate('/not-found', { replace: true })
      // Lọc rooms theo roomTypeId, cập nhật state
    }
    load()
  }, [id])

  // TODO-10A: Nếu loading → Spinner; nếu error → Alert danger
  if (loading) return null
  if (error) return null

  return (
    <div>
      {/* TODO-10A: Nút Back navigate('/room-types') */}
      {/* TODO-10A: Card với roomType name, Badge id */}
      {/* TODO-10A: Table rooms (name, floor, view, formatPriceRange, lastRenovated) */}
    </div>
  )
}

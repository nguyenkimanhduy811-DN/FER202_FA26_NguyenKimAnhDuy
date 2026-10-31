import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ModalConfirm from './ModalConfirm'
import { formatPriceRange } from '../utils/format'

export default function RoomRow({ room, index, onDelete }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleDeleteConfirm = () => {
    // TODO-06: Gọi onDelete(room.id) và đóng modal
    onDelete(room.id)
  setShowModal(false)
  }

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{room.name}</td>
        <td>{room.roomType}</td>
        <td>{room.floor}</td>
        <td>{room.view}</td>
        <td>{room.lastRenovated}</td>
        {/* TODO-07: Thay thế bằng formatPriceRange(room.priceWeekday, room.priceWeekend) */}
        <td>{formatPriceRange(room.priceWeekday, room.priceWeekend)}</td>
        <td className="d-flex gap-2">
          <Button size="sm" variant="info" onClick={() => navigate(`/rooms/${room.id}`)}>View</Button>
          {/* TODO-06: onClick mở modal xác nhận xoá */}
          <Button size="sm" variant="danger" onClick={() =>setShowModal(true)}>Delete</Button>
        </td>
      </tr>
      {/* TODO-06: Thêm ModalConfirm với show={showModal}, body chứa room.name */}
      <ModalConfirm
  show={showModal}
  title="Confirm Delete"
  body={`Are you sure you want to delete room "${room.name}"?`}
  onConfirm={handleDeleteConfirm}
  onCancel={() => setShowModal(false)}
    />
    </>
  )
}

import { useState, useEffect, useReducer } from 'react'
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap'
import { fetchRoomTypes, addRoomType, deleteRoomType, updateRoomType, fetchRooms } from '../api/roomApi'
import { roomTypeFormReducer, formInitialState } from '../reducer/roomTypeReducer'
import { validateRoomTypeName } from '../utils/validate'
import RoomTypeList from '../components/RoomTypeList'
import ModalConfirm from '../components/ModalConfirm'

export default function ManageRoomTypes() {
  const [roomTypes, setRoomTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formState, formDispatch] = useReducer(roomTypeFormReducer, formInitialState)
  const [showModal, setShowModal] = useState(false)
  const [targetId, setTargetId] = useState(null)
  const [targetName, setTargetName] = useState('')
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    fetchRoomTypes()
      .then((data) => { setRoomTypes(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    formDispatch({ type: 'SET_VALIDATED', payload: true })
    if (!form.checkValidity()) return
    // TODO-10A: validate tên, gọi addRoomType API, cập nhật danh sách, reset form
  }

  const handleDeleteClick = async (id, name) => {
    setTargetId(id)
    setTargetName(name)
    // TODO-10B: Gọi fetchRooms(), kiểm tra có phòng nào dùng roomTypeId này không
    // Nếu có → setDeleteError với thông báo chứa tên roomType
    // Nếu không → setDeleteError(null)
    setShowModal(true)
  }

  const handleDeleteConfirm = async () => {
    // TODO-10B: gọi deleteRoomType API, cập nhật danh sách, đóng modal
  }

  const handleUpdate = (updated) => {
    setRoomTypes((prev) => prev.map((rt) => (rt.id === updated.id ? updated : rt)))
  }

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <h2 className="mb-3">Manage Room Types</h2>
      <Card className="shadow-sm p-3 mb-4">
        <Form noValidate validated={formState.validated} onSubmit={handleAdd}>
          <Form.Group className="mb-2">
            <Form.Label>New Room Type Name</Form.Label>
            <Form.Control
              required
              value={formState.newName}
              onChange={(e) => formDispatch({ type: 'SET_NAME', payload: e.target.value })}
              isInvalid={formState.uniqueError}
              placeholder="e.g. Penthouse"
            />
            <Form.Control.Feedback type="invalid">
              {formState.uniqueError ? 'Room type name already exists.' : 'Name is required.'}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary">Add Room Type</Button>
        </Form>
      </Card>
      <RoomTypeList
        roomTypes={roomTypes}
        onDelete={(id) => {
          const rt = roomTypes.find((r) => r.id === id)
          handleDeleteClick(id, rt?.name ?? '')
        }}
        onUpdate={handleUpdate}
      />
      {/* TODO-10B: ModalConfirm — body hiển thị deleteError nếu có, hoặc xác nhận xoá */}
      <ModalConfirm
        show={showModal}
        title={deleteError ? 'Cannot Delete' : 'Confirm Delete'}
        body={deleteError ?? 'Are you sure you want to delete this room type?'}
        onConfirm={deleteError ? () => setShowModal(false) : handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
        confirmVariant={deleteError ? 'secondary' : 'danger'}
        confirmLabel={deleteError ? 'OK' : 'Delete'}
      />
    </div>
  )
}

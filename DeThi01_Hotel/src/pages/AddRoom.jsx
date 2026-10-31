import { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useRoom } from '../context/RoomContext'
import { addRoom, fetchRoomTypes } from '../api/roomApi'
import { validateRoomName } from '../utils/validate'

export default function AddRoom() {
  const { state, dispatch } = useRoom()
  const { rooms } = state
  const navigate = useNavigate()
  const [roomTypes, setRoomTypes] = useState([])
  const [form, setForm] = useState({
    name: '', roomTypeId: '', floor: '', view: '', lastRenovated: '', priceWeekday: '', priceWeekend: ''
  })
  const [validated, setValidated] = useState(false)
  const [nameError, setNameError] = useState(null)
  const [serverError, setServerError] = useState(null)

  // TODO-04: Gọi fetchRoomTypes() trong useEffect và cập nhật state roomTypes
  useEffect(() => {
    // TODO-04: implement fetchRoomTypes và setRoomTypes
    fetchRoomTypes().then(setRoomTypes).catch(console.error)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'name') setNameError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidated(true)
    const nameErr = validateRoomName(form.name, rooms)
    if (nameErr) { setNameError(nameErr); return }
    if (!e.currentTarget.checkValidity()) return
    try {
      const newRoom = await addRoom({
        ...form,
        roomTypeId: Number(form.roomTypeId),
        priceWeekday: Number(form.priceWeekday),
        priceWeekend: Number(form.priceWeekend),
      })
      dispatch({ type: 'ADD_ROOM', payload: newRoom })
      navigate('/')
    } catch {
      setServerError('Failed to add room. Please try again.')
    }
  }

  return (
    <div>
      <h2 className="mb-3">Add New Room</h2>
      {serverError && <Alert variant="danger">{serverError}</Alert>}
      <Card className="shadow-sm p-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Room Name</Form.Label>
            <Form.Control required name="name" value={form.name} onChange={handleChange}
              isInvalid={!!nameError} placeholder="e.g. Room 101" />
            <Form.Control.Feedback type="invalid">{nameError || 'Room name is required.'}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Room Type</Form.Label>
            <Form.Select required name="roomTypeId" value={form.roomTypeId} onChange={handleChange}>
              <option value="">-- Select room type --</option>
              {roomTypes.map((rt) => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Room type is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Floor</Form.Label>
            <Form.Control required name="floor" value={form.floor} onChange={handleChange} placeholder="e.g. 1" />
            <Form.Control.Feedback type="invalid">Floor is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>View</Form.Label>
            <Form.Control required name="view" value={form.view} onChange={handleChange} placeholder="e.g. Sea View" />
            <Form.Control.Feedback type="invalid">View is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Renovated (dd/MM/yyyy)</Form.Label>
            <Form.Control required name="lastRenovated" value={form.lastRenovated} onChange={handleChange} placeholder="e.g. 15/03/2022" />
            <Form.Control.Feedback type="invalid">Last renovated date is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price Weekday (VND)</Form.Label>
            <Form.Control required type="number" min="0" name="priceWeekday" value={form.priceWeekday} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Price weekday is required.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price Weekend (VND)</Form.Label>
            <Form.Control required type="number" min="0" name="priceWeekend" value={form.priceWeekend} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Price weekend is required.</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">Add Room</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

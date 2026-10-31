import { Form, Row, Col } from 'react-bootstrap'

export default function FilterBar({ nameFilter, setNameFilter, roomTypeFilter, setRoomTypeFilter, roomTypes }) {
  return (
    <Row className="mb-3 g-2">
      <Col md={6}>
        <Form.Control
          type="text"
          placeholder="Room name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Col>
      <Col md={6}>
        <Form.Select value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)}>
          <option value="">-- Filter by room type --</option>
          {roomTypes.map((rt) => (
            <option key={rt.id} value={rt.id}>{rt.name}</option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  )
}

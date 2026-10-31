import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login'
import RoomList from '../pages/RoomList'
import RoomDetail from '../pages/RoomDetail'
import AddRoom from '../pages/AddRoom'
import ManageRoomTypes from '../pages/ManageRoomTypes'
import RoomTypeDetail from '../pages/RoomTypeDetail'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><RoomList /></ProtectedRoute>} />
      <Route path="/rooms/:id" element={<ProtectedRoute><RoomDetail /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddRoom /></ProtectedRoute>} />
      <Route path="/room-types" element={<ProtectedRoute><ManageRoomTypes /></ProtectedRoute>} />
      <Route path="/room-types/:id" element={<ProtectedRoute><RoomTypeDetail /></ProtectedRoute>} />
      {/* Route /not-found KHÔNG được bọc ProtectedRoute — TODO-10A dùng navigate('/not-found') khi id không hợp lệ, phải hiển thị được kể cả khi chưa đăng nhập */}
      <Route path="/not-found" element={<NotFound />} />
      {/* TODO-09: Route * → NotFound page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

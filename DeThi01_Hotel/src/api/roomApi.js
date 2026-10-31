import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetchRoomTypes = async () => {
  const r = await axios.get(`${BASE_URL}/roomTypes`); return r.data
}
export const addRoomType = async (data) => {
  const r = await axios.post(`${BASE_URL}/roomTypes`, data); return r.data
}
export const updateRoomType = async (id, data) => {
  const r = await axios.put(`${BASE_URL}/roomTypes/${id}`, data); return r.data
}
export const deleteRoomType = async (id) => {
  const r = await axios.delete(`${BASE_URL}/roomTypes/${id}`); return r.data
}
export const fetchRooms = async () => {
  const r = await axios.get(`${BASE_URL}/rooms`); return r.data
}
export const fetchRoomById = async (id) => {
  const r = await axios.get(`${BASE_URL}/rooms/${id}`); return r.data
}
export const addRoom = async (data) => {
  const r = await axios.post(`${BASE_URL}/rooms`, data); return r.data
}
export const deleteRoom = async (id) => {
  const r = await axios.delete(`${BASE_URL}/rooms/${id}`); return r.data
}
